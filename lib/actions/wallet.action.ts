"use server";

import { currentUser } from "@clerk/nextjs/server";

export async function getWalletAddress() {
  const user = await currentUser();
  if (!user) return null; // No user logged in
  // Access the first web3 wallet (if available)
  const walletAddress = user.web3Wallets?.[0]?.web3Wallet || null;
  return walletAddress;
}
