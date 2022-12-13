class Withdrawal {
  constructor(value, balance, date) {
    this.value = value;
    this.balance = balance;
    this.date = date;
  }

  newBalance() {
    return this.balance - this.value;
  }

  makeWithdrawal() {
    const newBalance = this.newBalance();
    return {
      date: this.date,
      deposited: null,
      withdrawn: this.value,
      balance: newBalance,
    };
  }
}

module.exports = Withdrawal;
