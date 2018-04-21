class Transaction {
  constructor(driverLicenseNumber,voilationDate, voilationType){
    this.driverLicenseNumber = driverLicenseNumber;
    this.voilationDate = voilationDate;
    this.voilationType = voilationType;
    this.numOfVoilation = 1
    this.isDriverLicenseSuspended = false;
  }
}

export default Transaction;