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
        <Box
          sx={{
            display: 'flex',
            gap: 5,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <FormControl>
            {/* <FormLabel id="demo-radio-buttons-group-label">
              <b>Select the type of lottery to create</b>
              <br /> <br />
            </FormLabel> */}

            <Typography
              variant="h4"
              component="h4"
              sx={{
                paddingY: '2rem',
              }}
            >
              Select the type of lottery to create on BASE
            </Typography>

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
              <TextField
                id="prize-amout"
                label="Prize Amount in Wei"
                variant="filled"
                value={prizeAmount}
                onChange={handlePrizeAmountChange}
                disabled={selectedValue === 'giveaway' ? false : true}
              />
              <br />

              <br />
              <FormControlLabel
                value="Lottery"
                control={<Radio />}
                label="Lottery Ticket"
              />
              <TextField
                id="ticket-price"
                label="Ticket Price in Wei"
                variant="filled"
                value={ticketPrice}
                onChange={handleTicketPriceChange}
                disabled={selectedValue === 'giveaway' ? true : false}
              />
            </RadioGroup>
          </FormControl>
          <br />

          <Button
            variant="contained"
            sx={{
              boxShadow: 'none',
              width: '10rem',
              height: '4rem',
              textTransform: 'none',
              borderRadius: '30px',
              backgroundColor: '#1976D2',
              '&:hover': {
                backgroundColor: '#0052FF',
              },
            }}
            onClick={() => {
              if (selectedValue === 'giveaway') {
                console.log('Creating GiveAway');
                console.log('BigInt Prize', BigInt(prizeAmount));
                writeContract({
                  abi,
                  address: lotteryFactoryAddress,
                  functionName: 'createLottery',
                  args: [0, BigInt('1000000000000000')],
                  value: BigInt(prizeAmount),
                });
              }
              if (selectedValue != 'giveaway') {
                console.log('Creating Lottery');

                console.log('BigInt ticketPrice', BigInt(ticketPrice));
                writeContract({
                  abi,
                  address: lotteryFactoryAddress,
                  functionName: 'createLottery',
                  args: [1, BigInt(ticketPrice)],
                });
              }
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: '1.2rem',
              }}
            >
              Create Lottery
            </Typography>
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
