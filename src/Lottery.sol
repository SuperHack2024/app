// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {IEntropyConsumer} from "../node_modules/@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import {IEntropy} from "../node_modules/@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

contract Lottery {

    event WinnerSelected(uint64 sequenceNumber, address winnerAddress);

    IEntropy entropy;
    address entropyProvider;

    address public manager;
    address[] public players;
    uint public minimumEntryFee;
    uint32 public lotteryStartTime;
    uint32 public lotteryDuration;
    uint32 public maxPlayers = 5;
    bool public isLotteryActive;

    constructor(  uint _minimumEntryFee, uint32 _durationInSeconds) {
        
 
        
        //Initialize Game
        manager = msg.sender;
        minimumEntryFee = _minimumEntryFee;
        lotteryStartTime = uint32(block.timestamp);
        lotteryDuration = _durationInSeconds;
        isLotteryActive = true;
    }
    
    function enter() public payable {
        require(isLotteryActive, "Lottery is not active");
        require(msg.value >= minimumEntryFee, "Minimum Ether not met");
        require(block.timestamp < lotteryStartTime + lotteryDuration, "Lottery has ended");
        require(players.length < maxPlayers, "Maximum number of players reached");
        players.push(msg.sender);
    }
    

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public restricted {

        //require(uint32(block.timestamp) >= lotteryStartTime + lotteryDuration, "Lottery duration has not ended yet");
        uint index = random() % players.length;
        address winner = players[index];
        payable(winner).transfer(address(this).balance);

        // Calculate 5% fee and the amount to be transferred to the winner
        uint totalBalance = address(this).balance;
        uint fee = totalBalance * 5 / 100;
        uint amountToWinner = totalBalance - fee;

        // Transfer the fee to the manager
        payable(msg.sender).transfer(fee);
        
        // Transfer the remaining amount to the winner
        payable(winner).transfer(amountToWinner);

        //Reset the state of the contract
        players = new address [](maxPlayers);
        isLotteryActive = false;
        lotteryStartTime = uint32(block.timestamp); // Restart the lottery
    }
    
    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }
 

}