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
    })
  });
});
