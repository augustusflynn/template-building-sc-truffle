// require('@openzeppelin/test-helpers/configure')({
//   provider: 'http://localhost:8080',
// });
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
  time
} = require('@openzeppelin/test-helpers');
const ERC20 = artifacts.require("ERC20")

contract("Example Test", function (accounts) {
  let contractInstance
  // web3 existed in truffle already
  const utils = web3.utils;

  before("should set up before test", async () => {
    this.value = new BN(1);
    this.erc20 = await ERC20.new();
    // BN assertions are automatically available via chai-bn (if using Chai)
    assert.notEqual(this.erc20.address, null);
    assert.notEqual(this.erc20.address, undefined);
    assert.notEqual(this.erc20.address, "0x0");
    assert.notEqual(this.erc20.address, "");
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
    await time.advanceBlock();
  });

  it('reverts when transferring tokens to the zero address', async function () {
    // Conditions that trigger a require statement can be precisely tested
    await expectRevert(
      this.erc20.transfer(constants.ZERO_ADDRESS, this.value, { from: accounts[0] }),
      'ERC20: transfer to the zero address',
    );
  });

  it('emits a Transfer event on successful transfers', async function () {
    const receipt = await this.erc20.transfer(
      accounts[1], this.value, { from: accounts[0] }
    );

    // Event assertions can verify that the arguments are the expected ones
    expectEvent(receipt, 'Transfer', {
      from: accounts[0],
      to: accounts[1],
      value: this.value,
    });
  });

  it('updates balances on successful transfers', async function () {
    this.erc20.transfer(accounts[1], this.value, { from: accounts[0] });

    // BN assertions are automatically available via chai-bn (if using Chai)
    expect(await this.erc20.balanceOf(accounts[1]))
      .to.be.bignumber.equal(this.value);
  });

  it(".....", async () => {

  });

})
