import PersistentDrawerLeft from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Lottery from "@/components/Lottery";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box, Typography, TextField, Button } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";

export default function CreateLottery() {
  const [selectedValue, setSelectedValue] = useState("giveaway");

  return (
    <>
      <PersistentDrawerLeft />
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
          STATS
        </Box>
      </Box>
      <Footer />
    </>
  );
}
