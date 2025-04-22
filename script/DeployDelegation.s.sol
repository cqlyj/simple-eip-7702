// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {Delegation} from "src/Delegation.sol";
import {Vm} from "forge-std/Vm.sol";

contract DeployDelegation is Script {
    function run() external {
        address mockUSDC = Vm(address(vm)).getDeployment(
            "MockUSDC",
            uint64(block.chainid)
        );

        vm.startBroadcast();

        Delegation delegation = new Delegation(mockUSDC);
        console.log("Delegation deployed at:", address(delegation));
        vm.stopBroadcast();
    }
}
