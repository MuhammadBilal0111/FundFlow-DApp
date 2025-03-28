# Decentralized FundFlow Platform

FundFlow is a production-ready decentralized payment platform built on Ethereum. This full-stack DApp combines Next.js power with blockchain security for seamless crypto transactions.  

[![FundFlow Banner](public/assets/images/Hero.png)](https://github.com/MuhammadBilal0111/fundflow)  
<div align="center">
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Solidity-black?style=for-the-badge&logoColor=white&logo=solidity&color=363636" alt="solidity" />
    <img src="https://img.shields.io/badge/-Hardhat-black?style=for-the-badge&logoColor=white&logo=hardhat&color=1C1C1C" alt="hardhat" />
    <img src="https://img.shields.io/badge/-MetaMask-black?style=for-the-badge&logoColor=white&logo=metamask&color=F6851B" alt="metamask" />
    <img src="https://img.shields.io/badge/-Cloudinary-black?style=for-the-badge&logoColor=white&logo=cloudinary&color=F7B32E" alt="cloudinary" />
</div>
---

## Features
- **Next.js 15**: The latest version of Next.js for optimized performance.
- **TypeScript**: Ensures type safety and better development experience.
- **ShadCN & Aceternity UI**: Provides elegant and customizable UI components.
- **Sentry**: Error monitoring and tracking for application stability.
- **Ethers.js**: Facilitates Ethereum-based transactions.
- **MetaMask Integration**: Enables users to send and receive funds securely.
- **Hardhat**: Used for deploying smart contracts efficiently.
- **Solidity**: Smart contracts are written in Solidity for Ethereum blockchain integration.
- **Cloudinary**: Used for storing images.
---
## Getting Started
Ensure you have the necessary environment variables in place before running the project.

### Prerequisites
- MetaMask Wallet
- Ethereum Test Network (e.g., Sepolia)

### Environment Variables
Create a `.env.local` file and add the following credentials:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

Additionally, ensure that the Sentry authentication token is stored in the `.env.sentry-build-plugin` file:

```env
SENTRY_AUTH_TOKEN=
```
---
## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/MuhammadBilal0111/fundflow.git
cd fundflow
npm install
```

## Running the Project

Run the development server:

```sh
npm run dev
```

## Smart Contract Deployment

FundFlow uses smart contracts written in Solidity. You can deploy these contracts using Hardhat.

Compile and deploy your smart contract to the Ethereum network (e.g., Sepolia):

```
cd contract
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```
### Deploy Smart Contract to Sepolia Testnet

#### Configure Network (Etherscan, MetaMask, Alchemy API Keys)

Modify `hardhat.config.js` to include:

```js
module.exports = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: {
      sepolia: <ETHERSCAN_API_KEY>,
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${<ALCHEMY_API_KEY>}`,
      accounts: <SEPOLIA_PRIVATE_KEY>,
    },
};
```
---
## ScreenShots
---

## Images
Below are some screenshots of the platform:

### Home Page
![Home](public/assets/images/Hero.png)

### Campaigns
![Campaigns](public/assets/images/campaigns.png)

### Edit Campaigns
![Edit Campaigns](public/assets/images/Edit.png)

## License
This project is licensed under the MIT License.

Enjoy building! 🚀
