const Deposition =  require("./accountActions/Deposition")

class ClientAccount {
  constructor(name) {
    this.name = name;
    this.balance = 0;
    this.statement = [];
  }

  getBalance() {
    return this.balance;
  }

  addToBalance(value) {
    this.balance += value;
  }

  removeFromBalance(value) {
    this.balance -= value;
  }

  addToStatement(item) {
    this.statement.push(item);
  }

  deposit(value, date) {
    this.addToBalance(value)
  }
}

module.exports = ClientAccount;
