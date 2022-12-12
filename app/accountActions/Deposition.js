class Deposition {
  constructor(value, balance, date) {
    this.value = value;
    this.balance = balance;
    this.date = date;
  }
  newBalance() {
    return this.balance + this.value;
  }
}

module.exports = Deposition;
