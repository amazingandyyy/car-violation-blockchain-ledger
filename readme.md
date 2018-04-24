# car-violation-blockchain-ledger [![Build Status](https://travis-ci.org/amazingandyyy/car-violation-blockchain-ledger.svg?branch=master)](https://travis-ci.org/amazingandyyy/car-violation-blockchain-ledger )

A Public Blockchain that can track car violation history.

## Run it on your machine
```
$ npm clone https://github.com/amazingandyyy/blockchain-in-node.git
$ npm i
$ npm run dev // default on port 3000

<!-- to run more nodes -->
$ npm run nodes // default on port 3000
$ npm run nodes 3000 // listening on port 3000
$ npm run nodes 3001 // listening on port 3001
$ npm run nodes 3002 // listening on port 3002
```

## HTTP Endpoints
```
GET /blockchain // see the link-list itself
POST /blockchain/mine // find the next special hash
POST /blockchain/body // add new data to the chain 
sample body {
	"driverLicenseNumber": "DD1234",
	"voilationDate": "04/29/2018",
	"voilationType": "Speeding"
}

GET /blockchain/nodes // get a list of all nodes
GET /blockchain/nodes/resolve // fetch the longest chain
POST /blockchain/nodes/register // add nodes urls

POST /blockchain/records/:licenseNumber // get record of the given license Number
```

### There are many can be done: 
Please feel free to [fork](https://github.com/amazingandyyy/car-violation-blockchain-ledger#fork-destination-box), clone or send me [PR](https://github.com/amazingandyyy/car-violation-blockchain-ledger/pulls)

### Author 
Andy Chen([amazingandyyy](https://github.com/amazingandyyy))

### LICENSE
[MIT](https://github.com/amazingandyyy/blockchain-in-node/blob/master/LICENSE)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
