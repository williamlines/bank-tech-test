const ClientAccount = require("./app/ClientAccount");
const account = require("./index");

describe("export from index.js", () => {
  it("should contain the correct functions", () => {
    expect(account).toBeInstanceOf(ClientAccount);
  });
});
