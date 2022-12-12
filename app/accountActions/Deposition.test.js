const Deposition = require("./Deposition");

describe("class: Deposition", () => {
  beforeEach(() => {
    deposition = new Deposition(100, 2000, "01/02/2022");
  });

  it("constructs", () => {
    expect(deposition.value).toEqual(100);
    expect(deposition.balance).toEqual(2000);
    expect(deposition.date).toEqual("01/02/2022");
  });

  describe("function newBalance()", () => {
    it("can return the correct new balance", () => {
      expect(deposition.newBalance()).toEqual(2100);
    });
  });
});
