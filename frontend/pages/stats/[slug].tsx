import useSWR from "swr";
import { Box, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import type { GetServerSidePropsContext } from "next";
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

  if (error) return <>Error...</>;
  if (isLoading) return <>Loading...</>;
  if (!session) {
    router.push("/");
  }
  if (data) {
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
          <Typography variant="h6" gutterBottom>
            {(lotteryStatus as boolean) ? "Who is participating ? " : "Players"}
          </Typography>
          {participants?.map((item: string, index: any) => (
            <div key={index}>
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
            </div>
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
