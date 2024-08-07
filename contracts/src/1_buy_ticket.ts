import Web3 from "web3";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Lottery from "./Lottery.json";

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
  const LotteryAddress = "0x93773981c31208F2cAfe8422A6b30ff1c9AAa6b2";
  const rpc = "https://sepolia.base.org";

  const privateKey = "Your PK";

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
