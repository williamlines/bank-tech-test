class Action {
  constructor(value, balance, date, action) {
    this.value = value;
    this.balance = balance;
    this.date = date;
    this.action = action;
  }

  newBalance() {
    if (this.action === "deposit") {
      return this.balance + this.value;
    }
    return this.balance - this.value;
  }

  makeAction() {
    const newBalance = this.newBalance();
    if (this.action === "deposit") {
      return {
        date: this.date,
        deposited: this.value,
        withdrawn: null,
        balance: newBalance,
      };
    }
    return {
      date: this.date,
      deposited: null,
      withdrawn: this.value,
      balance: newBalance,
    };
  }
}

module.exports = Action;
