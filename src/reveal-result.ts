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

  console.log("2. Requesting coin flip...");
  const flipFee = (await coinFlipContract.methods
    .getFlipFee()
    .call()) as string;
  console.log(`   fee  is      : ${flipFee} wei`);

  console.log("3. Requesting result");

  // address provider,
  // uint64 sequenceNumber,
  // bytes32 userRandomNumber,
  // bytes32 providerRevelation

  const userRandomNumber = web3.utils.toHex(
    "0xcb94d3749d81646d7ca1921143dff47dcceaeea644e4003b5add97a2401c0e5d"
  );
  const providerRevelation = web3.utils.toHex(
    "0x4b1c52aa93cc60994a1412313da56fdbfcb85cffccee9041eb94e02097d0f9bd"
  );

  console.log("userRandomNumber", userRandomNumber);
  console.log("providerRevelation", providerRevelation);

  const revealed = coinFlipContract.methods
    .reveal(
      0x000000000000000000000000000000000000000000000000000000000000070c,
      userRandomNumber,
      providerRevelation
    )
    .call()
    .then(() => {
      console.log(`   revealed        : ${revealed} `);
    })
    .catch((err) => {
      console.log("error", err);
    });
}

main();
