// SPDX-License-Identifier: MIT
// @isaacwgarcia
pragma solidity ^0.8.17;
//import {LotteryNFT} from "./LotteryNFT.sol";
import {Lottery} from "./Lottery.sol";
import {LotteryType1} from "./Lottery1.sol";
import {LotteryType2} from "./Lottery2.sol";


contract LotteryFactory {
     
    LotteryType private lotteryType;
    //uint256 public prizeAmount;
    //uint256 public contractBalance;

    event PrizeSet(uint256 amount);
    event LotteryTypeSet(LotteryType lotteryType);
    event LotteryNotFound(uint256 id); // Event for not found lottery
    event LotteryContractAddress(address lottery); // Event for not found lottery


 
    uint256 private lotteryId;
    // mapping(uint256 => LotteryNFT) public idToLottery;
    // mapping(address => uint256) public lotteryOwners;


    enum LotteryType { Type1, Type2 }

    Lottery[] private lotteries;

    event LotteryCreated(address lotteryAddress, LotteryType lotteryType);

    function createLottery(LotteryType _lotteryType, uint256 _ticketPrice) public payable  {
       
        address sender = msg.sender;  

        if (_lotteryType == LotteryType.Type1) {
            Lottery newLottery;
            require(msg.value > 0, "No Ether sent Factory...");

            // newLottery = new LotteryType1{value: msg.value}(address(newLottery));

            newLottery = new LotteryType1{value: msg.value}(sender);
            //LotteryType1(payable(address(newLottery))).initialize{value: msg.value}(sender);
            LotteryType1(payable(address(newLottery))).initialize(sender);

            lotteries.push(newLottery);
             emit LotteryCreated(address(newLottery), _lotteryType);


            //LotteryType1(payable(address(newLottery))).initialize(sender); // Initialize Type1 with msg.value
        } else if (_lotteryType == LotteryType.Type2) {
            Lottery newLottery;
            newLottery = new LotteryType2(_ticketPrice);
            LotteryType2(payable(address(newLottery))).initialize(sender,_ticketPrice); // Initialize Type2 with ticket price
            lotteries.push(newLottery);
             emit LotteryCreated(address(newLottery), _lotteryType);

        } else {
            revert("Invalid lottery type");
        }

        // Store the deployed contract's address

       
    }

    // constructor(LotteryType _lotteryType) payable {
    //     lotteryType = _lotteryType;
    //     contractBalance = address(this).balance;
    //     emit LotteryTypeSet(_lotteryType);
    // }

//     function createLottery(uint256 _ticketPrice) public returns (uint256) {
   
//         LotteryNFT newLottery = new LotteryNFT(
//         _ticketPrice
//         );

//         lotteryId++;
//         idToLottery[lotteryId] = newLottery;
//         lotteryOwners[msg.sender] = lotteryId;
//         return lotteryId;
//   }

//   receive() external payable {
//         contractBalance += msg.value;
//     }

//  function getLotteryAddressByID(uint256 _id) public returns (address) {
//         if (_id >= lotteries.length) {
//             // Emit an event and revert if the lottery does not exist
//             emit LotteryNotFound(_id);
//             revert("Lottery ID does not exist");
//         }

//         emit LotteryContractAddress(address(lotteries[_id]));
//         return address(lotteries[_id]); // Return the address of the lottery
//     }

   function getLotteries() public view returns (Lottery[] memory) {
        return lotteries;
    }

//    function getLotteryByOwner(address _owner) public view returns (Lottery) {
//         return lotteries[_owner];
//   }
  

}