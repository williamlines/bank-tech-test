const Deposition = require("./accountActions/Deposition");
const Withdrawal = require("./accountActions/Withdrawal");

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
    const deposition = new Deposition(value, this.balance, date);
    const newItemForStatement = deposition.makeDeposit();
    this.addToBalance(value);
    this.addToStatement(newItemForStatement);
  }

  withdraw(value, date) {
    const withdrawal = new Withdrawal(value, this.balance, date);
    const newItemForStatement = withdrawal.makeWithdrawal();
    this.removeFromBalance(value);
    this.addToStatement(newItemForStatement);
  }
}

module.exports = ClientAccount;
