const ClientAccount = require("./ClientAccount");
const account = new ClientAccount("Tester");

describe("class Constructs", () => {
  it("has initially empty balance", () => {
    expect(account.balance).toEqual(0);
    expect(account.name).toEqual("Tester");
    expect(account.statement).toEqual([]);
  });
});
