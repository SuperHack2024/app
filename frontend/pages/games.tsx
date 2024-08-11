import { Box, Divider, LinearProgress, Typography } from '@mui/material';
import { useReadContract } from 'wagmi';

import LotteryABI from '../abis/LotteryFactory.json';
import Lottery from '@/components/Lottery';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default function Stats() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  const lotteryFactoryAddress = process.env.LOTTERYFACTORY_CONTRACT;

  const {
    data: lotteries,
    isLoading,
    error,
  } = useReadContract({
    abi: LotteryABI,
    address: lotteryFactoryAddress as `0x${string}`,
    functionName: 'getLotteries',
  });

  if (isLoading || loading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  const lottoeryCards: [] = lotteries as [];
  if (lotteries) {
    return (
      <>
        <TopBar />
        <Divider />
        <Box
          sx={{
            display: 'flex',
            marginTop: '3vh',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{
              paddingY: '1rem',
            }}
          >
            Available Lottery games:
          </Typography>
          <Box
            sx={{
              mr: '1rem',
              background: 'rgb(251, 251, 251)',
              color: 'black',
            }}
          >
            <w3m-button />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              mt: '5vh',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: '  column',
            }}
          >
            {lottoeryCards.map((item, key) => (
              <Lottery item={item} key={key} />
            ))}
          </Box>
        </Box>
      </>
    );
  }

  if (error)
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            marginLeft: '50px',
            marginRight: '50px',
            alignItems: 'center',
            backgroundColor: 'white',
            color: 'black',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              width: '100%',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            There was an unexpected network error, please try efreshing the page
            or Sign in again.
          </Box>
          <Footer />
        </Box>
      </>
    );
}
