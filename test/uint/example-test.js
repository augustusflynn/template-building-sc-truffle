const Contract = artifacts.require("Contract")
const { expect, assert } = require("chai")

contract("Example Test", function (accounts) {
  let contractInstance
  // web3 existed in truffle already
  const utils = web3.utils;

  before("should set up before test", async () => {
    contractInstance = await Contract.deployed()
    assert.notEqual(contractInstance.address, null);
    assert.notEqual(contractInstance.address, undefined);
    assert.notEqual(contractInstance.address, "0x0");
    assert.notEqual(contractInstance.address, "");
  });

  it(".....", async () => {

  });

})
