import useSWR from "swr";
import { Box, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import type { GetServerSidePropsContext } from "next";
import { shortenString, bigIntToEth } from "../../components/helpers/ops";
import RedeemIcon from "@mui/icons-material/Redeem";
import ReceiptIcon from "@mui/icons-material/Receipt";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session: JSON.stringify(session),
    },
  };
}
import { useReadContract } from "wagmi";
import LotteryAbi from "../../abis/Lottery.json";
import { fetcher } from "@/components/helpers/ops";
import Table from "@/components/Table";
import Link from "next/link";
interface Item {
  block: string;
  value: string;
  type: string;
}

export default function LotteryDetail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const id = router.query.slug;

  const {
    data: partipantsContract,
    isLoading: isLoadingFromContract,
    error: errorFromContract,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: "getParticipants",
  });
  const {
    data: lotteryWinner,
    isLoading: isLoadingWinner,
    error: errorWinner,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: "winnerAnnounced",
  });

  const noWinner = "0x0000000000000000000000000000000000000000";

  const {
    data: balance,
    isLoading: isLoadingBalance,
    error: errorBalance,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: "getBalance",
    args: [id as `0x${string}`],
  });

  const participants: [] = partipantsContract as [];
  const {
    data: lotteryStatus,
    isLoading: isLoadinglotteryStatus,
    error: errorlotteryStatus,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: "lotteryStatus",
  });

  const apiUrl = id
    ? `https://base-sepolia.blockscout.com/api/v2/addresses/${id}/internal-transactions?filter=to%20%7C%20from`
    : null;
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  const apiPrices =
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";
  const {
    data: ethPrices,
    error: errorEthPrices,
    isLoading: isLoadingEthPrices,
  } = useSWR(apiPrices, fetcher);
  const prize = bigIntToEth(balance as bigint);
  if (error) return <>Error...</>;
  if (isLoading) return <>Loading...</>;
  if (!session) {
    router.push("/");
  }
  if (data && ethPrices) {
    const items: Item[] = data.items;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          color: "black",
          marginTop: "12vh",
          flexDirection: "row",
          gap: 50,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "30%",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2" gutterBottom>
            <ReceiptIcon />
            Lottery Contract:
            <br />
            <Link
              href={`https://base-sepolia.blockscout.com/address/${id}`}
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenString(id as string)}
            </Link>
          </Typography>{" "}
          <br />
          {lotteryWinner === noWinner ? (
            <Typography variant="body2" gutterBottom>
              Prize:
              <br />
              <RedeemIcon /> {prize} ETH ~ ${" "}
              {(ethPrices.USD * prize).toFixed(2)}
            </Typography>
          ) : (
            <>
              Winner:
              <br />
              <Link
                href={`https://base-sepolia.blockscout.com/address/${id}`}
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortenString(lotteryWinner as string)}
              </Link>
            </>
          )}
          <br />
          <br />
          <Typography variant="body2" gutterBottom>
            {(lotteryStatus as boolean) ? "Who is participating ? " : "Players"}
          </Typography>
          {participants?.map((item: string, index: any) => (
            <Typography variant="body2" gutterBottom key={index}>
              <>
                <AccountCircleIcon />
                <Link
                  href={`https://base-sepolia.blockscout.com/address/${item}`}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item}
                </Link>
              </>
            </Typography>
          ))}
          <br />
          Status of the Lottery:{" "}
          {(lotteryStatus as boolean) ? "Active" : "Closed"}
          {/* TODO: Active only if the user is the owner and if it is active */}
          <Button
            sx={{ mt: "5vh" }}
            variant="contained"
            disabled={!lotteryStatus as boolean}
          >
            Select Winner
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            flexDirection: "column",
          }}
        >
          <Table items={items} />
        </Box>
      </Box>
    );
  }
}
