import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import "dotenv/config";

const abi = [
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "authorize",
    inputs: [
      { name: "walletAddress", type: "address", internalType: "address" },
      { name: "pin", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "payFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address payable" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "pin", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "s_authorizedPins",
    inputs: [
      { name: "walletAddress", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "pin", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Authorized",
    inputs: [
      {
        name: "walletAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      { name: "pin", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Pay",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      { name: "to", type: "address", indexed: false, internalType: "address" },
      { name: "pin", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  { type: "error", name: "InvalidPin", inputs: [] },
];

const contractAddress = "0x097A59b1080a562B5de7678F0cF329951F8452d2";

const privateKey = process.env.PRIVATE_KEY as `0x${string}`;

const relay = privateKeyToAccount(privateKey);

const walletClient = createWalletClient({
  account: relay,
  chain: sepolia,
  transport: http(),
});

const eoaPrivateKey = process.env.EOA_PRIVATE_KEY as `0x${string}`;
const eoa = privateKeyToAccount(eoaPrivateKey);

const authorization = await walletClient.signAuthorization({
  account: eoa,
  contractAddress,
});

const pin = 123456n;

const hash = await walletClient.writeContract({
  abi,
  address: eoa.address,
  authorizationList: [authorization],
  functionName: "authorize",
  args: [eoa.address, pin],
});

console.log("hash", hash);

// import { createPublicClient } from "viem";

// const publicClient = createPublicClient({
//   chain: sepolia,
//   transport: http(),
// });

// const readHash = await publicClient.readContract({
//   abi,
//   address: eoa.address,
//   functionName: "s_authorizedPins",
//   args: [eoa.address],
// });

// console.log("readHash", readHash);

const hash2 = await walletClient.writeContract({
  abi,
  address: eoa.address,
  functionName: "payFrom",
  args: [eoa.address, "0xFB6a372F2F51a002b390D18693075157A459641F", 1000n, pin],
});

console.log("hash2", hash2);
