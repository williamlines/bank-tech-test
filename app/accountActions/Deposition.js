class Deposition {
  constructor(value, balance, date) {
    this.value = value;
    this.balance = balance;
    this.date = date;
  }

  newBalance() {
    return this.balance + this.value;
  }

  makeDeposit() {
    const newBalance = this.newBalance();
    return {
      date: this.date,
      deposited: this.value,
      balance: newBalance,
    };
  }
}

module.exports = Deposition;
