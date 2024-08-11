import Footer from '@/components/Footer';
import { useState } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useWriteContract } from 'wagmi';
import TopBar from '@/components/TopBar.tsx';
import Auth from '@/components/Auth.tsx';

export default function CreateLottery() {
  const { writeContract } = useWriteContract();
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Full viewport height
      }}
    >
      <TopBar />
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1, // Fill remaining space
          marginTop: '5vh',
        }}
      >
        <Grid
          container
          xs={12}
          sx={{
            alignItems: 'center',
          }}
        >
          <Grid
            sx={{
              paddingX: '4rem',
              textAlign: 'left',
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
              How to buy your CRYPTO LOTTERY™ ticket?
            </Typography>

            {/* STEPS/DESC */}
            <Typography
              variant="h5"
              sx={{ paddingY: '0.5rem', paddingX: '8rem' }}
            >
              1. Sign in using the Worldcoin App.
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingY: '0.5rem', paddingX: '8rem' }}
            >
              2. Connect your Ethereum wallet.
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingY: '0.5rem', paddingX: '8rem' }}
            >
              3. Select the game and click in Buy ticket.
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingY: '0.5rem', paddingX: '8rem' }}
            >
              4. Verify the price and confirm the transaction in your Ethereum
              wallet.
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingTop: '0.5rem', paddingX: '8rem' }}
            >
              5. You will receive an NFT and join that Lottery pool.
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                width: '100%',
                alignItems: 'center',
                boxSizing: 'border-box',
                paddingY: '2rem',
              }}
            >
              <Auth />
            </Box>
            <Divider />
            {/* TITLE */}
            <Typography
              variant="h3"
              sx={{ paddingX: '4rem', paddingY: '3rem' }}
            >
              CRYPTO LOTTERY™ game Rules
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingTop: '0.5rem', paddingX: '8rem' }}
            >
              - Each user must sign in with Worldcoin to participate.{' '}
              <strong>Proof of Personhood</strong> guarantees that no Syndicates
              can take over the game.
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingTop: '0.5rem', paddingX: '8rem' }}
            >
              - All ETH paid in tickets will be automicatlly sent to the winner
              by our Smart contract.
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingTop: '0.5rem', paddingX: '8rem' }}
            >
              - In the near future we will start deducting 5% over the ETH prize
              to cover transaction fees.
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingTop: '0.5rem', paddingX: '8rem' }}
            >
              - Each game has only one winner selected randomly using the{' '}
              <strong>Pyth Network.</strong>
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingTop: '0.5rem', paddingX: '8rem' }}
            >
              - All transactions are verifyable using the{' '}
              <strong>BlockScout BASE</strong> explorer.
            </Typography>
          </Grid>
          <Grid xs={12}></Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}
