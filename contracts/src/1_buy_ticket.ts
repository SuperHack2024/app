import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Lottery from "./LotteryNFTAbi.json";

async function main() {
  const LotteryAddress = "0x69e6851B0a0C5D94122AbdFDD4D190a4F9508d97"; //Smart contract address for a specific lottery
  const rpc = "https://sepolia.base.org";

  const privateKey = "YOUR_PK"; //account 7

  const provider = new HDWalletProvider({
    privateKeys: [privateKey],
    providerOrUrl: rpc,
  });

  const web3 = new Web3(provider as any);

  const LotteryContract = new web3.eth.Contract(Lottery as any, LotteryAddress);

  console.log("2. Requesting Ticket Price...");
  const ticketPrice = (await LotteryContract.methods
    .ticketPrice()
    .call()) as string;
  console.log(`   ticketPrice    is   : ${ticketPrice} wei`);

  try {
    console.log("Buying Ticket ...");

    await LotteryContract.methods
      .joinLotteryTicket()
      .send({ value: ticketPrice, from: provider.getAddress(0) });

    console.log("Verifying Players ...");

    const players = (await LotteryContract.methods
      .getParticipants()
      .call()) as string;

    console.log("Players are ::::", players);
  } catch (e) {
    console.log("Exception: ", e);
  }
  provider.engine.stop();
}

main();
