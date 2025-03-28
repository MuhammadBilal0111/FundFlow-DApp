# Decentralized FundFlow Platform

FundFlow is a decentralized platform that enables seamless payments through Ethereum. Built with modern web technologies, it ensures secure, transparent, and efficient fund transfers.

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

## Getting Started
Ensure you have the necessary environment variables in place before running the project.

### Prerequisites
- MetaMask Wallet
- Ethereum Test Network (e.g., Sepolia)

### Environment Variables
Create a `.env.local` file and add the following credentials:

\`\`\`env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
\`\`\`

Additionally, ensure that the Sentry authentication token is stored in the `.env.sentry-build-plugin` file:

\`\`\`env
SENTRY_AUTH_TOKEN=
\`\`\`

## Installation

Clone the repository and install dependencies:

\`\`\`bash
git clone https://github.com/MuhammadBilal0111/fundflow.git
cd fundflow
npm install
\`\`\`

## Running the Project

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

## Smart Contract Deployment

FundFlow uses smart contracts written in Solidity. You can deploy these contracts using Hardhat.

Compile and deploy the smart contract to the Ethereum network (e.g., Sepolia):

\`\`\`bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
\`\`\`

## Images
Below are some screenshots of the platform:

### Home Page
![Home](public/assets/images/Hero.jpg)

### Campaigns
![Campaigns](public/assets/images/campaigns.png)

### Edit Campaigns
![Edit Campaigns](public/assets/images/Edit.jpg)

## License
This project is licensed under the MIT License.
