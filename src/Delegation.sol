// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Delegation {
    mapping(address walletAddress => uint256 pin) public s_authorizedPins;

    error InvalidPin();
    event Authorized(address walletAddress, uint256 pin);
    event Pay(address sender, address to, uint256 pin);

    // Authorize a pin to be used for moving funds
    function authorize(address walletAddress, uint256 pin) external {
        s_authorizedPins[walletAddress] = pin;
        emit Authorized(walletAddress, pin);
    }

    // Pay once get the pin
    function payFrom(
        address from,
        address payable to,
        uint256 amount,
        uint256 pin
    ) external {
        if (s_authorizedPins[from] == pin) {
            (bool success, ) = to.call{value: amount}("");
            emit Pay(from, to, pin);
        } else {
            revert InvalidPin();
        }
    }

    receive() external payable {}
}
