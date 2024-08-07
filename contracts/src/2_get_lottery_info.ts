import Web3 from "web3";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Lottery from "./Lottery.json";
import Lottery1 from "./Lottery1.json";

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

  try {
    const web3 = new Web3(provider as any);

    const LotteryContract = new web3.eth.Contract(
      Lottery as any,
      LotteryAddress
    );

    const LotteryProxy = new web3.eth.Contract(
      Lottery1 as any,
      "0x2F76D054cfEa3124367abaf8BFE2a403Cbd36c1F"
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
  } catch (e) {
    console.log("Exception: ", e);
  }
  provider.engine.stop();
}

main();
