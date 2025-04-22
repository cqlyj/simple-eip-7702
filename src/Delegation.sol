// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {MockUSDC} from "src/MockUSDC.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Delegation {
    mapping(address walletAddress => uint256 pin) public s_authorizedPins;
    address public s_mockUSDC;

    error InvalidPin();

    constructor(address mockUSDC) {
        s_mockUSDC = mockUSDC;
    }

    // Authorize a pin to be used for moving funds
    function authorize(address walletAddress, uint256 pin) external {
        s_authorizedPins[walletAddress] = pin;
    }

    // Pay once get the pin
    function pay(address payable to, uint256 amount, uint256 pin) external {
        if (s_authorizedPins[msg.sender] == pin) {
            IERC20(s_mockUSDC).transfer(to, amount);
        } else {
            revert InvalidPin();
        }
    }
}
