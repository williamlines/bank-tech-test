const Deposition = require("./Deposition")

describe("class: Deposition", () => {
  it("constructs", () => {
    const deposition = new Deposition(100, 2000, "01/02/2022");
    expect(deposition.value).toEqual(100);
    expect(deposition.balance).toEqual(2000);
    expect(deposition.date).toEqual("01/02/2022");
  });
});
