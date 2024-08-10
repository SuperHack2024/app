import PersistentDrawerLeft from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Lottery from "@/components/Lottery";

import { Box, Typography } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Landing() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <>
      <PersistentDrawerLeft />{" "}
      <Typography
        variant="body2"
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",

          padding: 3,
        }}
      >
        Test
      </Typography>
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
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          Lottery Detail
        </Box>
      </Box>
      <Footer />
    </>
  );
}
