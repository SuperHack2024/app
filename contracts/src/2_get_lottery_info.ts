import Web3 from "web3";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Lottery from "./LotteryNFTAbi.json";

const parser = yargs(hideBin(process.argv))
  .option("private-key", {
    description: "Private key (as a hexadecimal string) of the sender",
    type: "string",
    required: true,
  })
  .option("address", {
    description: "The address of the Lottery NFT contract",
    type: "string",
    required: true,
  })
  .option("rpc-url", {
    description:
      "The URL of an ETH RPC service for reading/writing to the blockchain",
    type: "string",
    required: true,
  })
  .help()
  .alias("help", "h")
  .parserConfiguration({
    "parse-numbers": false,
  });

async function main() {
  const LotteryAddress = "0x3504Dc10a962b8Df1e570a8d61F6E3651051a455";
  const rpc = "https://84532.rpc.thirdweb.com/8a44946670297b87aa3e12d0aafde17d";

  const privateKey = "YOUR_PK"; //account 7

  const provider = new HDWalletProvider({
    privateKeys: [privateKey],
    providerOrUrl: rpc,
  });

  try {
    const web3 = new Web3(provider as any);

    const LotteryContract = new web3.eth.Contract(
      Lottery as any,
      LotteryAddress
    );

    console.log("1. Requesting Ticket Price...");
    const ticketPrice = (await LotteryContract.methods
      .ticketPrice()
      .call()) as string;
    console.log(` The ticketPrice is: ${ticketPrice} wei`);
    console.log("2. Getting Players ...");

    const players = (await LotteryContract.methods
      .getParticipants()
      .call()) as string;

    console.log("Players ::: ", players);

    const balanceWei = await web3.eth.getBalance(LotteryAddress);
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");
    console.log(`   Balance of Lottery is: ${balanceEther} ether`);

    const owner = (await LotteryContract.methods.owner().call()) as string;
    console.log(`   Owner of Lottery is: ${owner}  `);

    const winnerAnnounced = (await LotteryContract.methods
      .winnerAnnounced()
      .call()) as string;
    console.log(`   winner of Lottery is: ${winnerAnnounced}  `);
  } catch (e) {
    console.log("Exception: ", e);
  }
  provider.engine.stop();
}

main();
