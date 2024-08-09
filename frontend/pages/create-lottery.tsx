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

  // Handler function for when the radio button value changes
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("selected value changed", selectedValue);
  };
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Lottery Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={handleChange}
            >
              <FormControlLabel
                value="giveaway"
                control={<Radio />}
                label="Giveaway"
              />
              <FormControlLabel
                value="Lottery"
                control={<Radio />}
                label="Lottery Ticket"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            id="filled-basic"
            label="Ticket Price in Wei"
            variant="filled"
            disabled={selectedValue === "giveaway" ? true : false}
          />
          <Button
            onClick={() => {
              console.log("creating lottery ");
            }}
            variant="contained"
          >
            Create Lottery
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
