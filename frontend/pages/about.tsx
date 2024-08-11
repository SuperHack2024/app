import Footer from '@/components/Footer';

import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import { useWriteContract } from 'wagmi';
import { abi } from '../abis/abiLotteryFactory.ts';
import LotteryABI from '../abis/Lottery.json';
import TopBar from '@/components/TopBar.tsx';

const LotteryFactory = '0xA955C832Fc6c74c1143356F115e8CBEAAe514fB2';

export default function CreateLottery() {
  const { writeContract } = useWriteContract();

  const lotteryFactoryAddress = process.env
    .LOTTERYFACTORY_CONTRACT as `0x${string}`;

  const [prizeAmount, setPrizeAmount] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  const handlePrizeAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrizeAmount(event.target.value);
  };

  const handleTicketPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTicketPrice(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState('giveaway');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    console.log('selected value changed', selectedValue);
  };

  return (
    <>
      <TopBar />
      <Divider />
      <Box
        sx={{
          display: 'flex',
          marginTop: '15vh',
          height: '60vh',
          flexDirection: 'column',
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h3"
          sx={{
            paddingX: '4rem',
            paddingY: '1rem',
          }}
        >
          The team
        </Typography>
      </Box>
      <Footer />
    </>
  );
}
