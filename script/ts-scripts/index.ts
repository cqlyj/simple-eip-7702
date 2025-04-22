import { walletClient } from "../../config";
import { abi, contractAddress } from "../../abi/contract";
import { privateKeyToAccount } from "viem/accounts";

const eoaPrivateKey = process.env.EOA_PRIVATE_KEY as `0x${string}`;
const eoa = privateKeyToAccount(eoaPrivateKey);

const authorization = await walletClient.signAuthorization({
  account: eoa,
  contractAddress,
});

const pin = 123456n;
console.log("pin", pin);

const hash = await walletClient.writeContract({
  abi,
  address: eoa.address,
  authorizationList: [authorization],
  functionName: "authorize",
  args: [eoa.address, pin],
});
