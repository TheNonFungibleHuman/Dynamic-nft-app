require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { alchemyApiKey, mnemonic } = process.env;

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    alfajores: {
      url: `https://alfajores-forno.celo-testnet.org/?apiKey=${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
  },
};
