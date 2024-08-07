// SPDX-License-Identifier: MIT
// @isaacwgarcia
pragma solidity ^0.8.17;
import "./Lottery.sol";

contract LotteryType2 is Lottery {
    constructor(uint256 _ticketPrice) Lottery(LotteryType.Type2) payable {ticketPrice = _ticketPrice;}
    
    // Type2 sets the ticket price 
    function initialize(uint256 _ticketPrice) public {
        setTicketPrice(_ticketPrice);
    }
}