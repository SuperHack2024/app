// SPDX-License-Identifier: MIT
// @isaacwgarcia
pragma solidity ^0.8.17;
import "./Lottery.sol";

contract LotteryType1 is Lottery {

    address public lotteryAddress;
    uint256 public prize;
    constructor(address _lotteryAddress) Lottery(LotteryType.Type1) payable{

        lotteryAddress = _lotteryAddress;
        prize = msg.value; // Initialize prize with the sent Ether
     }
    
    // Giveaway sets the prize based on msg.value during deployment
    function initialize(address creator) public payable {
        
        //require(msg.value > 0, "No Ether sent...");
        transferOwnership(creator);
       
    }

    
}