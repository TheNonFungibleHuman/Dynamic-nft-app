const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DynamicNFT", function () {
  it("Should mint a token with correct metadata", async function () {
    const DynamicNFT = await ethers.getContractFactory("DynamicNFT");
    const contract = await DynamicNFT.deploy();
    await contract.deployed();

    const [owner, minter1, minter2] = await ethers.getSigners();

    await contract.connect(minter1).mint();
    await contract.connect(minter2).mint();

    const token1BlockNumber = await contract.blockNumbers(0);
    const token1MinterCount = await contract.minterCounts(0);
    const token1URI = await contract.tokenURI(0);

    const token2BlockNumber = await contract.blockNumbers(1);
    const token2MinterCount = await contract.minterCounts(1);
    const token2URI = await contract.tokenURI(1);

    expect(token1BlockNumber.toNumber()).to.equal(token2BlockNumber.toNumber());
    expect(token1MinterCount.toNumber()).to.equal(1);
    expect(token2MinterCount.toNumber()).to.equal(2);
    expect(token1URI).to.equal(
      `ipfs://QmW8ENwRJjvvXsD6vZo8i8PaW8kXnTt8eKz7C1B2W4oXsK/${token1BlockNumber}/${token1MinterCount}`
    );
    expect(token2URI).to.equal(
      `ipfs://QmW8ENwRJjvvXsD6vZo8i8PaW8kXnTt8eKz7C1B2W4oXsK/${token2BlockNumber}/${token2MinterCount}`
    );
  });
});
