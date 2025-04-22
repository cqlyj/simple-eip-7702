import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = process.env.PRIVATE_KEY as `0x${string}`;

export const relay = privateKeyToAccount(privateKey);

export const walletClient = createWalletClient({
  account: relay,
  chain: sepolia,
  transport: http(),
});
