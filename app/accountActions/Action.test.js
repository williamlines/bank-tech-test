const Action = require("./Action");

describe("class: Action", () => {
  beforeEach(() => {
    deposition = new Action(100, 2000, "01/03/2022", "deposit");
    withdrawal = new Action(100, 2000, "01/03/2022", "withdrawal");
  });

  it("constructs", () => {
    expect(withdrawal.value).toEqual(100);
    expect(withdrawal.balance).toEqual(2000);
    expect(withdrawal.date).toEqual("01/03/2022");
    expect(withdrawal.action).toEqual("withdrawal");
  });

  describe("newBalance function", () => {
    it("returns the new balance", () => {
      expect(withdrawal.newBalance()).toEqual(1900);
    });
  });

  describe("function makeAction()", () => {
    it("returns the desired object", () => {
      expect(withdrawal.makeAction()).toEqual({
        date: "01/03/2022",
        deposited: null,
        withdrawn: 100,
        balance: 1900,
      });
    });
  });

  it("constructs", () => {
    expect(deposition.value).toEqual(100);
    expect(deposition.balance).toEqual(2000);
    expect(deposition.date).toEqual("01/03/2022");
    expect(deposition.action).toEqual("deposit");
  });

  describe("function newBalance()", () => {
    it("can return the correct new balance", () => {
      expect(deposition.newBalance()).toEqual(2100);
    });
  });

  describe("function makeAction()", () => {
    it("can return the correct object", () => {
      expect(deposition.makeAction()).toEqual({
        date: "01/03/2022",
        deposited: 100,
        withdrawn: null,
        balance: 2100,
      });
    });
  });
});
