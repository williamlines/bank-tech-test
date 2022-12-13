const Action = require("./accountActions/Action");

class ClientAccount {
  constructor() {
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
    const deposition = new Action(value, this.balance, date, "deposit");
    const newItemForStatement = deposition.makeAction();
    this.addToBalance(value);
    this.addToStatement(newItemForStatement);
  }

  withdraw(value, date) {
    const withdrawal = new Action(value, this.balance, date, "withdrawal");
    const newItemForStatement = withdrawal.makeAction();
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
    console.log(returnString);
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
