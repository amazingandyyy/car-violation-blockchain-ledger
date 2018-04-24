import fetch from 'node-fetch';
import sha256 from 'js-sha256';

import Transaction from './transaction';
import Blockchain from './blockchain';
import genesisBlock from './genesisBlock';
import BlockchainNode from './blockchainNode';

import Middleware from './middleware';

const router = require('express').Router();

let body = [];
let blockchain = new Blockchain(genesisBlock);
let nodes = [];

router.get('/', (req, res)=>{
  res.json(blockchain);
})

router.post('/mine', (req, res)=>{
  if(body.length < 1){
    return res.json(blockchain.blocks[blockchain.blocks.length-1]);
  }
  let block = blockchain.generateNextBlock(body)
  body = [];
  blockchain.addBlock(block);
  res.json(block);
})

router.post('/body', (req, res)=>{
  let middleware = new Middleware();

  const {driverLicenseNumber, voilationDate, voilationType} = req.body;
  let transaction = new Transaction(sha256(driverLicenseNumber) , voilationDate ,voilationType)
  middleware.apply(transaction, blockchain.blocks, body);
  
  body.push(transaction);
  res.json(body);
})

router.get('/records/:drivingLicenseNumber', (req, res)=>{
  let { drivingLicenseNumber } = req.params;
  let transaction = blockchain.transactionsByDriverLicenseNumber(drivingLicenseNumber);
  res.json(transaction);
})

router.get('/nodes/resolve', (req, res)=>{
  if(nodes.length<1){
    return res.send('No Nodes')
  }
  let count = 0;
  nodes.forEach((n, i, nodes)=>{
    let url = `http://${n.url}/blockchain`;
    fetch(url)
    .then(r=>r.json())
    .then(otherChain=>{
      count += 1;
      if(blockchain.blocks.length < otherChain.blocks.length){
        blockchain = otherChain;
      }
      if(count==nodes.length) return res.send(blockchain);
    })
    .catch(err=>res.send(err))
  })
})

router.post('/nodes/register', (req, res)=>{
  let nodeList = req.body.urls;
  if(!nodeList) return res.sendStatus(500);
  nodeList.forEach((n)=>{
    if(n.url !== req.headers.host){
      let node = new BlockchainNode(n.url);
      nodes.push(node);
    }
  })

  res.json(nodes);
})

router.get('/nodes', (req, res)=>{
  res.json(nodes);
})

export default router;