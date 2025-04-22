// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {MockUSDC} from "src/MockUSDC.sol";

contract DeployMockUSDC is Script {
    function run() external {
        vm.startBroadcast();
        address mockUSDC = address(new MockUSDC());
        console.log("Mock USDC deployed at:", mockUSDC);
        vm.stopBroadcast();
    }
}
