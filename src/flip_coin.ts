import Web3 from "web3";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import HDWalletProvider from "@truffle/hdwallet-provider";
import CoinFlipAbi from "./CoinFlipAbi.json";

const parser = yargs(hideBin(process.argv))
  .option("private-key", {
    description: "Private key (as a hexadecimal string) of the sender",
    type: "string",
    required: true,
  })
  .option("address", {
    description: "The address of the CoinFlip contract",
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
  const argv = await parser.argv;

  const coinFlipContractAddress = argv.address;
  const rpc = argv.rpcUrl;
  const privateKey = argv.privateKey;

  console.log("coinFlipContractAddress", coinFlipContractAddress);
  console.log("rpc", rpc);
  console.log("privateKey", privateKey);

  const provider = new HDWalletProvider({
    privateKeys: [privateKey],
    providerOrUrl: rpc,
  });

  const web3 = new Web3(provider as any);

  const coinFlipContract = new web3.eth.Contract(
    CoinFlipAbi as any,
    coinFlipContractAddress
  );

  console.log(`Running coin flip prototcol.`);

  console.log("1. Generating user's random number...");
  const randomNumber = web3.utils.randomHex(32);
  console.log(`   number    : ${randomNumber}`);

  console.log("2. Requesting coin flip...");
  const flipFee = (await coinFlipContract.methods
    .getFlipFee()
    .call()) as string;
  console.log(`   fee       : ${flipFee} wei`);

  const receipt = await coinFlipContract.methods
    .requestFlip(randomNumber)
    .send({ value: flipFee, from: provider.getAddress(0) });

  console.log(`   tx        : ${receipt.transactionHash}`);
  const sequenceNumber =
    receipt.events?.FlipRequest.returnValues.sequenceNumber;
  console.log(`   sequence  : ${sequenceNumber}`);

  console.log("3. Waiting for result...");
  // Poll for new FlipResult events emitted by the CoinFlip contract. It checks if the event
  // has the same sequenceNumber as the request. If it does,
  // it logs the result and stops polling.
  let fromBlock = receipt.blockNumber;
  const intervalId = setInterval(async () => {
    const currentBlock = (await web3.eth.getBlockNumber()) as bigint;

    if (fromBlock > currentBlock) {
      return;
    }

    // Get 'FlipResult' events emitted by the CoinFlip contract for given block range.
    const events = await coinFlipContract.getPastEvents("FlipResult", {
      fromBlock: fromBlock,
      toBlock: currentBlock,
    });
    console.log("fromBlock ", fromBlock);
    console.log("currentBlock", currentBlock);

    fromBlock = currentBlock + BigInt(1); //Increase the fromBlock in 1
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

      // console.log(
      //   `   result    : ${event.returnValues.isHeads ? "Heads" : "Tails"}`
      // );
    }
  }, 1000);

  provider.engine.stop();
}

main();
