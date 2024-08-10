import PersistentDrawerLeft from "@/components/Sidebar";
import Footer from "@/components/Footer";
import useSWR from "swr";
import { Box, Typography } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
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

export default function LotteryDetail() {
  const router = useRouter();
  const id = router.query.slug;

  const isSmallScreen = useMediaQuery("(max-width:600px)");
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
    const items: [] = data.items;
    console.log("Data is ", items);
    return (
      <>
        <PersistentDrawerLeft />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",

            backgroundColor: "red",
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
          </Box>
        </Box>
        <Footer />
      </>
    );
  }
}
