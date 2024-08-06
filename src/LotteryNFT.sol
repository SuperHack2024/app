// SPDX-License-Identifier: MIT
// @isaacwgarcia
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {IEntropyConsumer} from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import {IEntropy} from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

library LotteryNFTErrors {
    error IncorrectSender();
    error InsufficientFee();
}

contract LotteryNFT is ERC721, ERC721URIStorage, Ownable, IEntropyConsumer {

    // Event emitted when requesting the winner
    event WinnerRequestEvent(uint64 sequenceNumber);
    // Event emitted when the winner is known
    event WinnerResultEvent(uint64 sequenceNumber, uint256 winnerSlot);

    IEntropy entropy;
    address entropyProvider;
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public tokenCounter;
    address[] public participants;
    uint256 public ticketPrice;
    address public winnerAnnounced;

    address private entropy_contract= 0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c;
    address private entropy_provider= 0x6CC14824Ea2918f5De5C2f75A9Da968ad4BD6344;
    
    struct WinnerRequest {
        address sender;
        uint256 timestamp;

    }

    mapping(uint64 => WinnerRequest) public pendingWinnerRequests;

    constructor(uint256 _ticketPrice) ERC721("Chouqian", "CNFT") Ownable(msg.sender)  {
        tokenCounter = 0;
        ticketPrice = _ticketPrice;
        entropy = IEntropy(entropy_contract);
        entropyProvider = entropy_provider;
     
    }
   

    function joinLottery() public payable {
        require(msg.value >= ticketPrice, "Incorrect ticket price");
        participants.push(msg.sender);
        mintTicket(msg.sender);
        tokenCounter++;
    }

    function getWinnerSelectionFee() public view returns (uint256 fee) {
        fee = entropy.getFee(entropyProvider);
    }

    function drawWinner(bytes32 userRandomNumber) public payable onlyOwner returns (uint64 _sequenceNumber) {
        require(participants.length > 0, "No participants in the lottery");
        uint128 requestFee = entropy.getFee(entropyProvider);
        if (msg.value < requestFee) {
            revert LotteryNFTErrors.InsufficientFee();
        }

        _sequenceNumber = entropy.requestWithCallback{value: requestFee}(
                    entropyProvider,
                    userRandomNumber
                );

        pendingWinnerRequests[_sequenceNumber] = WinnerRequest({
            sender: msg.sender,
            timestamp: block.timestamp
        });

        //Clear participants array and set counter to 0 TODO if we are going to keep the participants or not.
        //delete participants;
        //tokenCounter = 0; 

    }

 

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }

    //   function _baseURI() internal pure override returns (string memory) {
    //     return "https://example.com/nft/"; //TODO Replace URI
    // }
 
    function mintTicket(address to) private  {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
        _setTokenURI(tokenCounter, "ipfs://<URI>"); // Replace with actual URI
    }

    function updateTokenURI(uint256 tokenId, string memory newURI) public onlyOwner {   //Set New URI when winner selected.
        _setTokenURI(tokenId, newURI);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {    
   
        return super.tokenURI(tokenId);
    }

    function withdraw(uint256 amount) external onlyOwner {
        (bool success,) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");

        
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address,
        bytes32 randomNumber
    ) internal override {

        WinnerRequest memory request = pendingWinnerRequests[sequenceNumber];
        require(request.sender != address(0), "Invalid Address");

        // Select winner from participants
        uint256 winnerSlot = uint(randomNumber) % participants.length;

        // Get address
        address selectedAddress = participants[winnerSlot];
        // Send Prize to Winner - 5% comission
        uint256 balance = address(this).balance;
        //uint256 amountToSend = (balance * 95) / 100; TODO TEMP COMMENT
        // bool sent = selectedAddress.send(amountToSend);
        (bool sent,) = selectedAddress.call{value: balance}("");
 
        // Error sending Prize
        require(sent, "Failed to send Ether");
        winnerAnnounced = selectedAddress;

        emit WinnerResultEvent(sequenceNumber,  uint256(winnerSlot));
    }

    // This method is required by the IEntropyConsumer interface.
    // It returns the address of the entropy contract which will call the callback.
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721,ERC721URIStorage) returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}