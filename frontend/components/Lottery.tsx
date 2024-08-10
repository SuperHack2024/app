import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ListItemText } from "@mui/material";
import Link from "next/link";
interface LotteryProps {
  item: any; // Replace `any` with the actual type of `item`
  key: number;
}
const Lottery: React.FC<LotteryProps> = ({ item, key }) => {
  console.log("Item", item, key);
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://picsum.photos/200"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Prize is 124 ETH
        </Typography>
        <Link href={`/stats/${item}`}>
          <Typography variant="body2" color="text.secondary">
            {item}
          </Typography>
        </Link>
      </CardContent>
      <CardActions>
        <Button size="small">Play</Button>
      </CardActions>
    </Card>
  );
};

export default Lottery;
