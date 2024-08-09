import Web3 from "web3";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import HDWalletProvider from "@truffle/hdwallet-provider";
import LotteryNFTAbi from "./LotteryNFTAbi.json";

async function main() {
  // const argv = await parser.argv;

  const LotteryAddress = "0x3504Dc10a962b8Df1e570a8d61F6E3651051a455";
  const rpc = "https://sepolia.base.org";

  const privateKey = "YOUR_PK"; //account 7

  console.log("LotteryNFTAddress", LotteryAddress);
  console.log("rpc", rpc);
  console.log("privateKey", privateKey);

  const provider = new HDWalletProvider({
    privateKeys: [privateKey],
    providerOrUrl: rpc,
  });

  const web3 = new Web3(provider as any);

  const LotteryContract = new web3.eth.Contract(
    LotteryNFTAbi as any,
    LotteryAddress
  );

  console.log("1. Generating user's random number...");
  const randomNumber = web3.utils.randomHex(32);
  console.log(`   UseerRandomNumber is    : ${randomNumber}`);

  console.log("2. Requesting fee...");
  const fee = (await LotteryContract.methods
    .getWinnerSelectionFee()
    .call()) as string;
  console.log(`   Fee    is   : ${fee} wei`);

  try {
    console.log("Calling Winner");

    const receipt = await LotteryContract.methods
      .drawWinner(randomNumber)
      .send({ value: fee, from: provider.getAddress(0) });

    console.log(`   tx        : ${receipt.transactionHash}`);

    const sequenceNumber =
      receipt.events?.WinnerRequestEvent.returnValues.sequenceNumber;
    console.log(`   sequence  : ${sequenceNumber}`);

    console.log("3. Waiting for result...");

    let fromBlock = receipt.blockNumber;

    const intervalId = setInterval(async () => {
      const currentBlock = (await web3.eth.getBlockNumber()) as bigint;

      if (fromBlock > currentBlock) {
        return;
      }

      const events = await LotteryContract.getPastEvents("WinnerResultEvent", {
        fromBlock: fromBlock,
        toBlock: currentBlock,
      });
      console.log("fromBlock ", fromBlock);
      console.log("currentBlock", currentBlock);

      fromBlock = currentBlock + BigInt(1);
      console.log("------------------------------------------------");

      console.log(" new fromBlock", fromBlock);

      // Find the event with the same sequence number as the request.
      let event = events.find((event) => {
        console.log("Event :::::", event);
        return event;
      });

      if (event) {
        console.log("Event is :::::>>>>>>", event);
        // Convert to JSON string
        const replacer = (key: any, value: bigint) => {
          if (typeof value === "bigint") {
            return `${value}n`;
          }
          return value;
        };

        // Custom reviver function for JSON.parse
        const reviver = (key: any, value: any) => {
          if (typeof value === "string" && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1));
          }
          return value;
        };

        // Convert to JSON string using the replacer function
        const jsonString = JSON.stringify(event, replacer);
        console.log(jsonString); // For debugging purposes

        // Parse JSON string back to object using the reviver function
        const jsonObject = JSON.parse(jsonString, reviver);

        // Get the value of returnValues
        const returnValues = jsonObject.returnValues;

        if (returnValues.sequenceNumber === sequenceNumber) {
          console.log("Sequence Numbers match :", returnValues);
          clearInterval(intervalId);
        } else {
          console.log("waiting for more result...");
        }
      }
    }, 1000);
  } catch (e) {
    console.log("Exception", e);
  }
  provider.engine.stop();
}

main();
