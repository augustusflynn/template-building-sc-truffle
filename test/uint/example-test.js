const Contract = artifacts.require("Contract")
const { expect } = require("chai")

contract("Example Test", function (accounts) {
  let contractInstance
  // web3 existed in truffle already
  const utils = web3.utils;

  before("should set up before test", async () => {
    contractInstance = await Contract.deployed()
    expect(
      contractInstance.address !== null &&
      contractInstance.address !== undefined &&
      contractInstance.address !== "0"
    ).to.equal(true);
  });

  it(".....", async () => {

  });

})
