import PersistentDrawerLeft from "@/components/Sidebar";
import Footer from "@/components/Footer";
import useSWR from "swr";
import { Box, Typography, Button } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { useReadContract } from "wagmi";
import LotteryAbi from "../../abis/Lottery.json";
const fetcher = (url: string) =>
  fetch(url, {
    method: "GET", // Explicitly set the GET method
    headers: {
      "Content-Type": "application/json", // Optional: Set headers if needed
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

interface Item {
  block: string;
  value: string;
  type: string;
}

export default function LotteryDetail() {
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

  if (error)
    return (
      <>
        <PersistentDrawerLeft />
        Error...
      </>
    );
  if (isLoading)
    return (
      <>
        <PersistentDrawerLeft />
        Loading...
      </>
    );
  if (data) {
    const items: Item[] = data.items;
    console.log("Data is ", items);

    console.log("Lottery Status", lotteryStatus);

    return (
      <>
        <PersistentDrawerLeft />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            color: "black",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <b> Powered by: BlockScout</b>
            {items.map((item, index: any) => (
              <div key={index}>
                {/* TODO: Style this information. Probably a table */}
                <>{item.block} </>
                <>{item.value} </> {/* TODO: Convert this from WEI to ETH */}
                <>{item.type} </>
              </div>
            ))}
            <br /> <br /> <br />
            <Typography variant="h6" gutterBottom>
              List of Participants
            </Typography>
            {participants?.map((item: string, index: any) => (
              <div key={index}>
                {/* TODO: Style this information. Probably a table */}
                <>{item} </>
              </div>
            ))}
            <br />
            <br />
            <br />
            Status of the Lottery:{" "}
            {(lotteryStatus as boolean) ? "Active" : "Closed"}
            {/* TODO: Active only if is the owner and if it is active */}
            <Button
              sx={{ mt: "10vh" }}
              variant="contained"
              disabled={!lotteryStatus as boolean}
            >
              Select Winner
            </Button>
          </Box>
        </Box>
        <Footer />
      </>
    );
  }
}
