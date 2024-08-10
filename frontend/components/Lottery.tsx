import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ListItemText } from "@mui/material";
import Link from "next/link";
import { useReadContract } from "wagmi";
import LotteryAbi from "../abis/Lottery.json";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Image from "next/image";
import { ethers } from "ethers";

interface LotteryProps {
  item: any; // Replace `any` with the actual type of `item`
  key: number;
}
const Lottery: React.FC<LotteryProps> = ({ item, key }) => {
  const {
    data: lotteryType,
    isLoading,
    error,
  } = useReadContract({
    abi: LotteryAbi,
    address: item as `0x${string}`,
    functionName: "lotteryType",
  });

  const {
    data: ticketPrice,
    isLoading: loadingticketPrice,
    error: errorticketPrice,
  } = useReadContract({
    abi: LotteryAbi,
    address: item as `0x${string}`,
    functionName: "ticketPrice",
  });

  const {
    data: lotteryWinner,
    isLoading: isLoadingWinner,
    error: errorWinner,
  } = useReadContract({
    abi: LotteryAbi,
    address: item as `0x${string}`,
    functionName: "winnerAnnounced",
  });

  // console.log("TicketPrice", ticketPrice); TODO: Get the ticket price
  // const weiToEth = (wei: bigint): string => {
  //   return ethers.formatEther(wei?.toString());
  // };
  // const ethAmount = weiToEth(ticketPrice as bigint);
  if (lotteryType != null) {
    return (
      <Card
        sx={{
          width: "600px",
          background: "rgb(200, 230, 255)",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Image
          src={lotteryType === 0 ? "/giveaway.png" : "/lottery.png"}
          width={200}
          height={200}
          alt="Lottery Type Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {lotteryType === 0 ? "Free Giveaway" : "Paid Lottery Ticket"}
          </Typography>
          <Link href={`/stats/${item}`}>
            <Typography variant="body2" color="text.secondary">
              {item}
            </Typography>
          </Link>
          <CardContent>
            <Typography variant="body2">
              Winner:{" "}
              {lotteryWinner ===
              "0x0000000000000000000000000000000000000000" ? (
                "Lottery is still running"
              ) : (
                <span>
                  {lotteryWinner as string} <EmojiEventsIcon />
                </span>
              )}
              <br />
              <br />
              {/* Ticket Price: {ethAmount ? ethAmount : 0} Ξ */}
            </Typography>
          </CardContent>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            disabled={
              lotteryWinner !== "0x0000000000000000000000000000000000000000"
            }
          >
            Play
          </Button>
        </CardActions>
      </Card>
    );
  }
};

export default Lottery;
