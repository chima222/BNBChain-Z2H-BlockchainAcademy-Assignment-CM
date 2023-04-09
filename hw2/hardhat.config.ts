import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "./tasks";
import "./tasks/functionSignature";
import "./tasks/storageStructure";

import * as dotenv from "dotenv";

dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || "" 
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || ""
const BSCTEST_RPC_URL = process.env.BSCTEST_RPC_URL || ""



const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      localhost: 0,
      97: 0,
    },
  },
  // Default network when you don't specify "--network {network_name}"
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
    bsctest: {
      url: BSCTEST_RPC_URL,
      chainId: 97,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY,
    },
  },
};

export default config;
