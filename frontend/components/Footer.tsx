import { Box } from "@mui/material";
import Image from "next/image";
const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10vh",
        height: "5vh",
        gap: 5,
      }}
    >
      <b>Powered by</b>

      <Image src={"/base.svg"} width={50} height={50} alt="Base Sponsor Logo" />
      <Image
        src={"/blockscout.svg"}
        width={100}
        height={50}
        alt="Blockscout Sponsor Logo"
      />
      <Image src={"pyth.svg"} width={50} height={50} alt="Pyth Sponsor Logo" />
      <Image
        src={"/worldcoin.svg"}
        width={50}
        height={50}
        alt="WorldCoin Sponsor Logo"
      />
      <Image
        src={"/superhack.png"}
        width={50}
        height={50}
        alt="SuperHack 2024 Logo"
      />
    </Box>
  );
};

export default Footer;
