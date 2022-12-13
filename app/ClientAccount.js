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

  getAccountStatement() {
    let returnString = "date || credit || debit || balance";
    const orderedStatement = this.statement.slice().reverse();
    for (let i = 0; i < orderedStatement.length; i++) {
      returnString += `\n${this.makeStatementObjectString(
        orderedStatement[i]
      )}`;
    }
    return returnString;
  }

  makeStatementObjectString(object) {
    const credit = this.convertToPounds(object.deposited);
    const debit = this.convertToPounds(object.withdrawn);
    const balance = this.convertToPounds(object.balance);
    return `${object.date} || ${credit} || ${debit} || ${balance}`;
  }

  convertToPounds(value) {
    if (value === null) {
      return "";
    } else {
      let newValue = value / 100;
      return newValue.toFixed(2);
    }
  }
}

module.exports = ClientAccount;
