/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
const PRIVATE_KEY = process.env.PRIVATE_KEY
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "AQI6WTF9KWFMPIHR93CMH4EH9GNGAXBTME"
const BSCTEST_RPC_URL =
    process.env.BSCTEST_RPC_URL ||
    "https://attentive-warmhearted-asphalt.bsc-testnet.discover.quiknode.pro/9b449876b99ae4814f9e5bda2e257c07313daebf"
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            url: "https://127.0.0.1:8545/",
            chainId: 31337,
        },
        bsctest: {
            url: BSCTEST_RPC_URL,
            chainId: 97,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            blockConfirmations: 6,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.18",
            },
        ],
    },
    etherscan: {
        // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            bscTestnet: BSCSCAN_API_KEY,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            97: 0,
        },
        user1: {
            default: 1,
        },
    },
}
