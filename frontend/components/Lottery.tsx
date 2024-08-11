import * as React from 'react';
import {
  Card,
  Box,
  CardContent,
  Button,
  Typography,
  LinearProgress,
} from '@mui/material';
import Link from 'next/link';
import { useReadContract, useWriteContract } from 'wagmi';
import { abi } from '../abis/abiLottery.ts';
import LotteryAbi from '../abis/Lottery.json';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Image from 'next/image';
import { bigIntToEth } from '@/components/helpers/ops';
interface LotteryProps {
  item: any;
  key: number;
}
const Lottery: React.FC<LotteryProps> = ({ item, key }) => {
  const { writeContract } = useWriteContract();

  const {
    data: lotteryType,
    isLoading,
    error,
  } = useReadContract({
    abi: LotteryAbi,
    address: item as `0x${string}`,
    functionName: 'lotteryType',
  });

  const {
    data: ticketPrice,
    isLoading: loadingticketPrice,
    error: errorticketPrice,
  } = useReadContract({
    abi: LotteryAbi,
    address: item as `0x${string}`,
    functionName: 'ticketPrice',
  });

  const {
    data: lotteryWinner,
    isLoading: isLoadingWinner,
    error: errorWinner,
  } = useReadContract({
    abi: LotteryAbi,
    address: item as `0x${string}`,
    functionName: 'winnerAnnounced',
  });

  const noWinner = '0x0000000000000000000000000000000000000000';

  if (isLoading || isLoadingWinner || loadingticketPrice) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }
  if (lotteryType != null) {
    return (
      <Card
        sx={{
          display: 'flex',
          width: '700px',
          background: 'rgb(200, 230, 255)',
          borderRadius: '20px',
          boxShadow: '10px 10px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box>
          <Image
            src={lotteryType === 0 ? '/giveaway.png' : '/lottery.png'}
            width={200}
            height={200}
            alt="Lottery Type Image"
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {lotteryType === 0 ? 'Free Giveaway' : 'Paid Lottery Ticket'}
          </Typography>
          <Link href={`/stats/${item}`}>
            <Typography variant="body2" color="text.secondary">
              {item}
            </Typography>
          </Link>
          <CardContent sx={{ margin: '2px' }}>
            <Typography variant="inherit">
              {lotteryWinner === noWinner ? (
                'Lottery is active.'
              ) : (
                <span>
                  Winner:
                  <br />
                  {lotteryWinner as string} <EmojiEventsIcon />
                </span>
              )}
              <br />
              <br />
              Ticket Price:
              {ticketPrice ? bigIntToEth(ticketPrice as bigint) : 0} ETH
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            disabled={lotteryWinner !== noWinner}
            onClick={() => {
              // console.log("Executing Write Contract with ", item);
              // console.log("Executing Write Contract with value ", ticketPrice);

              writeContract({
                abi,
                address: item as `0x${string}`,
                functionName: 'joinLotteryTicket',
                value: ticketPrice as bigint,
              });
            }}
          >
            {lotteryType === 0 ? 'Participate' : 'Purchase Ticket'}
          </Button>
        </CardContent>
      </Card>
    );
  }
};

export default Lottery;
