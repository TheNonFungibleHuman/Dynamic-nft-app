const { ethers } = require("hardhat");

async function main() {
  const DynamicNFT = await ethers.getContractFactory("DynamicNFT");
  const contract = await DynamicNFT.deploy();
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
