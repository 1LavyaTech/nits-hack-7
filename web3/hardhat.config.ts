import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: "snowtrace",
    },
  },
  networks: { fuji: { accounts: [process.env.PRIVATE_KEY!], url: "https://api.avax-test.network/ext/bc/C/rpc", chainId: 43113 } }
};

export default config;
