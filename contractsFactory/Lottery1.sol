// SPDX-License-Identifier: MIT
// @isaacwgarcia
pragma solidity ^0.8.17;
import "./Lottery.sol";

contract LotteryType1 is Lottery {
    constructor() Lottery(LotteryType.Type1) payable { }
    
    // Giveaway sets the prize based on msg.value during deployment
    function initialize() public payable {
        require(msg.value <= 0, "Incorrect Ether sent");
        setPrize();
    }
}