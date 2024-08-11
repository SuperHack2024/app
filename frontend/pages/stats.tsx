import { Box, LinearProgress } from "@mui/material";
import { useReadContract } from "wagmi";

import LotteryABI from "../abis/LotteryFactory.json";
import Lottery from "@/components/Lottery";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import type { GetServerSidePropsContext } from "next";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session: JSON.stringify(session),
    },
  };
}

export default function Stats() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const lotteryFactoryAddress = process.env.LOTTERYFACTORY_CONTRACT;

  const {
    data: lotteries,
    isLoading,
    error,
  } = useReadContract({
    abi: LotteryABI,
    address: lotteryFactoryAddress as `0x${string}`,
    functionName: "getLotteries",
  });

  if (!session) {
    router.push("/");
  }

  if (isLoading || loading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  const list_lotto: [] = lotteries as [];
  if (lotteries) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            marginTop: "10vh",
            flexDirection: "column",
          }}
        >
          <>You have been authenticated with WorldCoin</>

          <strong> {session?.user?.name}</strong>
          <Box
            sx={{
              display: "flex",
              gap: 5,
              mt: "5vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "  column",
            }}
          >
            {list_lotto.map((item, key) => (
              <Lottery item={item} key={key} />
            ))}
          </Box>
        </Box>
      </>
    );
  }

  if (error)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            marginLeft: "50px",
            marginRight: "50px",
            alignItems: "center",
            backgroundColor: "white",
            color: "black",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 5,
              width: "100%",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            Something ocurred.
          </Box>
        </Box>
      </>
    );
}
