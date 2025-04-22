export const abi = [
  {
    type: "constructor",
    inputs: [{ name: "mockUSDC", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
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
    name: "pay",
    inputs: [
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
    type: "function",
    name: "s_mockUSDC",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  { type: "error", name: "InvalidPin", inputs: [] },
];

export const contractAddress = "0x0fB46F1F4E601bB67153117BA22bB290F84Fd261";
