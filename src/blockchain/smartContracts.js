export default class DrivingRecordSmartContract {
  apply(transaction, blocks, body) {
    // go through all blocks
      blocks.forEach(block => {
        block.body.forEach(item=>{
          if(transaction.driverLicenseNumber == item.driverLicenseNumber ) {
            transaction.numOfVoilation += 1
            if(transaction.numOfVoilation > 5) {
              transaction.isDriverLicenseSuspend = true
            }
          }
        })
      })
    if(body){
      body.forEach(item=>{
        if(transaction.driverLicenseNumber == item.driverLicenseNumber ) {
          transaction.numOfVoilation += 1
          if(transaction.numOfVoilation > 5) {
            transaction.isDriverLicenseSuspend = true
          }
        }
      })
    }
  }
}