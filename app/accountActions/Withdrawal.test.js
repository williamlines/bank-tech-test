const Withdrawal = require("./Withdrawal");

describe("class: Withdrawal", () => {
  beforeEach(() => {
    withdrawal = new Withdrawal(200, 2000, "01/03/2022");
  });

  it("constructs", () => {
    expect(withdrawal.value).toEqual(200);
    expect(withdrawal.balance).toEqual(2000);
    expect(withdrawal.date).toEqual("01/03/2022");
  });

  describe("newBalance function", () => {
    it("returns the new balance", () => {
      expect(withdrawal.newBalance()).toEqual(1800);
    });
  });

  describe("function makeWithdrawal()", () => {
    it("returns the desired object", () => {
      expect(withdrawal.makeWithdrawal()).toEqual({
        date: "01/03/2022",
        deposited: null,
        withdrawn: 200,
        balance: 1800,
      });
    });
  });
});
