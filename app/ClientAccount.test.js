const ClientAccount = require("./ClientAccount");

describe("class ClientAccount", () => {
  beforeEach(() => {
    account = new ClientAccount("Tester");
  });

  it("constructs", () => {
    expect(account.balance).toEqual(0);
    expect(account.name).toEqual("Tester");
    expect(account.statement).toEqual([]);
  });

  describe("functions interacting with the balance", () => {
    it("getBalance() can return the initially empty balance", () => {
      expect(account.getBalance()).toEqual(0);
    });

    it("addToBalance() can add to balance", () => {
      account.addToBalance(1000);
      expect(account.getBalance()).toEqual(1000);
    });

    it("removeFromBalance() can remove from balance", () => {
      account.removeFromBalance(2000);
      expect(account.getBalance()).toEqual(-2000);
    });

    it("can addToBalance() and then removeFromBalance() and balance will be correct", () => {
      account.addToBalance(5000);
      account.removeFromBalance(3000);
      expect(account.getBalance()).toEqual(2000);
    });

    it("can add zero to balance", () => {
      account.addToBalance(0);
      expect(account.getBalance()).toEqual(0);
    });

    it("can remove zero to balance", () => {
      account.removeFromBalance(0);
      expect(account.getBalance()).toEqual(0);
    });

    it("can add negative to balance", () => {
      account.addToBalance(-5);
      expect(account.getBalance()).toEqual(-5);
    });

    it("can remove negative from balance", () => {
      account.removeFromBalance(-10);
      expect(account.getBalance()).toEqual(10);
    });
  });

  describe("function addToStatement", () => {
    it("can add to the statement array", () => {
      account.addToStatement("just a string");
      expect(account.statement).toEqual(["just a string"]);
    });

    it("can add multiple items to the statement array", () => {
      account.addToStatement("just a string");
      account.addToStatement("now another string");
      expect(account.statement).toEqual([
        "just a string",
        "now another string",
      ]);
    });
  });

  describe("function deposit()", () => {
    it("correctly updates the balance", () => {
      account.deposit(300, "01/05/2022");
      expect(account.balance).toEqual(300);
    });

    it("pushes desired object to the statement array", () => {
      account.deposit(300, "01/05/2022");
      expect(account.statement).toEqual([
        {
          date: "01/05/2022",
          deposited: 300,
          withdrawn: null,
          balance: 300,
        },
      ]);
    });

    it("can make multiple deposits consecutively", () => {
      account.deposit(300, "01/05/2022");
      account.deposit(400, "02/05/2022");
      expect(account.statement).toEqual([
        {
          date: "01/05/2022",
          deposited: 300,
          withdrawn: null,
          balance: 300,
        },
        {
          date: "02/05/2022",
          deposited: 400,
          withdrawn: null,
          balance: 700,
        },
      ]);
      expect(account.balance).toEqual(700);
    });
  });

  describe("withdraw() function", () => {
    it("correctly updates the balance", () => {
      account.withdraw(400, "01/02/2022");
      expect(account.balance).toEqual(-400);
    });

    it("can push the correct object to the statement array", () => {
      account.withdraw(400, "01/02/2022");
      expect(account.statement).toEqual([
        {
          date: "01/02/2022",
          deposited: null,
          withdrawn: 400,
          balance: -400,
        },
      ]);
    });
    it("can make multiple withdrawals consecutively", () => {
      account.withdraw(400, "01/02/2022");
      account.withdraw(200, "02/02/2022");
      expect(account.statement).toEqual([
        {
          date: "01/02/2022",
          deposited: null,
          withdrawn: 400,
          balance: -400,
        },
        {
          date: "02/02/2022",
          deposited: null,
          withdrawn: 200,
          balance: -600,
        },
      ]);
    });
  });

  describe("interaction between withdraw and deposit functions", () => {
    it("can make a deposit then a withdrawal", () => {
      account.deposit(1000, "01/01/2022");
      account.withdraw(200, "02/01/2022");
      expect(account.statement).toEqual([
        {
          date: "01/01/2022",
          deposited: 1000,
          withdrawn: null,
          balance: 1000,
        },
        {
          date: "02/01/2022",
          deposited: null,
          withdrawn: 200,
          balance: 800,
        },
      ]);
      expect(account.balance).toEqual(800);
    });

    it("can make a withdrawal, then a deposit", () => {
      account.withdraw(200, "02/01/2022");
      account.deposit(1000, "01/01/2022");
      expect(account.statement).toEqual([
        {
          date: "02/01/2022",
          deposited: null,
          withdrawn: 200,
          balance: -200,
        },
        {
          date: "01/01/2022",
          deposited: 1000,
          withdrawn: null,
          balance: 800,
        },
      ]);
      expect(account.balance).toEqual(800);
    });
  });

  describe("function convertToPounds()", () => {
    it("returns an empty string when given null", () => {
      expect(account.convertToPounds(null)).toEqual("");
    });

    it("converts 200 from pence to pounds", () => {
      expect(account.convertToPounds(200)).toStrictEqual((2.0).toFixed(2));
    });

    it("converts 1000 from pence to pounds", () => {
      expect(account.convertToPounds(1000)).toStrictEqual((10.0).toFixed(2));
    });

    it("converts 1234 from pence to pounds", () => {
      expect(account.convertToPounds(1234)).toStrictEqual((12.34).toFixed(2));
    });

    it("converts 1 from pence to pounds", () => {
      expect(account.convertToPounds(1)).toStrictEqual((0.01).toFixed(2));
    });

    it("converts 13 from pence to pounds", () => {
      expect(account.convertToPounds(13)).toStrictEqual((0.13).toFixed(2));
    });
  });

  describe("function makeStatementObjectString()", () => {
    it("can format a deposit to the correct string form", () => {
      account.deposit(200, "01/01/2022");
      expect(account.makeStatementObjectString(account.statement[0])).toEqual(
        "01/01/2022 || 2.00 ||  || 2.00"
      );
    });
    it("can format a withdrawal to the correct string form", () => {
      account.withdraw(200, "01/01/2022");
      expect(account.makeStatementObjectString(account.statement[0])).toEqual(
        "01/01/2022 ||  || 2.00 || -2.00"
      );
    });
  });

  describe("function getAccountStatement()", () => {
    it("returns a formatted account statement when one deposit is made", () => {
      account.deposit(200, "01/01/2022");
      expect(account.getAccountStatement())
        .toEqual(`date || credit || debit || balance
01/01/2022 || 2.00 ||  || 2.00`);
    });

    it("returns a formatted account statement when one withdrawal is made", () => {
      account.withdraw(200, "01/01/2022");
      expect(account.getAccountStatement())
        .toEqual(`date || credit || debit || balance
01/01/2022 ||  || 2.00 || -2.00`);
    });

    it("can format when there has been multiple deposits", () => {
      account.deposit(200, "01/01/2022");
      account.deposit(300, "02/01/2022");
      expect(account.getAccountStatement())
        .toEqual(`date || credit || debit || balance
02/01/2022 || 3.00 ||  || 5.00
01/01/2022 || 2.00 ||  || 2.00`);
    });

    it("can format when there has been multiple withdrawals", () => {
      account.withdraw(200, "01/01/2022");
      account.withdraw(300, "02/01/2022");
      expect(account.getAccountStatement())
        .toEqual(`date || credit || debit || balance
02/01/2022 ||  || 3.00 || -5.00
01/01/2022 ||  || 2.00 || -2.00`);
    });

    it("can format when there has been a deposit and a withdrawal.", () => {
      account.deposit(30000, "01/01/2022");
      account.withdraw(20000, "02/01/2022");
      expect(account.getAccountStatement())
        .toEqual(`date || credit || debit || balance
02/01/2022 ||  || 200.00 || 100.00
01/01/2022 || 300.00 ||  || 300.00`);
    });
  });
});
