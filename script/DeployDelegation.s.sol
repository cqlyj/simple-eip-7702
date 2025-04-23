// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {Delegation} from "src/Delegation.sol";

contract DeployDelegation is Script {
    function run() external {
        vm.startBroadcast();

        Delegation delegation = new Delegation();
        console.log("Delegation deployed at:", address(delegation));
        vm.stopBroadcast();
    }
}
