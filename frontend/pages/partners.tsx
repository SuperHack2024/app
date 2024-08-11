import { Typography, Divider, Grid } from '@mui/material';
import TopBar from '@/components/TopBar.tsx';
import Image from 'next/image';

export default function Partners() {
  return (
    <>
      <TopBar />
      <Divider />
      <Typography
        variant="h4"
        sx={{
          paddingX: '4rem',
          paddingY: '3rem',
        }}
      >
        Glad you got here, we are looking for sponsors and partners.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          paddingX: '4rem',
          paddingY: '1rem',
        }}
      >
        CRYPTO LOTTERY™ is a Blockchain Lottery game and Ethereum rewards
        service providers for companies and content creators of the Web3 digital
        economy.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          paddingX: '4rem',
          paddingY: '1rem',
        }}
      >
        Powered by:
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          paddingX: '10rem',
          paddingY: '1rem',
        }}
      >
        <Grid
          xs={6}
          sx={{
            paddingX: '1rem',
            paddingY: '1rem',
          }}
        >
          <Image
            src="/base.svg"
            alt="BASE"
            // layout="responsive"
            width={500}
            height={300}
          />
        </Grid>
        <Grid
          xs={6}
          sx={{
            paddingX: '1rem',
            paddingY: '1rem',
          }}
        >
          <Image
            src="/ethglobal.svg"
            alt="Eth Global"
            // layout="responsive"
            width={300}
            height={300}
          />
        </Grid>
        <Grid
          xs={6}
          sx={{
            paddingX: '1rem',
            paddingY: '2rem',
          }}
        >
          <Image
            src="/pyth.svg"
            alt="Pyth Network"
            // layout="responsive"
            width={300}
            height={300}
          />
        </Grid>
        <Grid
          xs={6}
          sx={{
            paddingX: '1rem',
            paddingY: '2rem',
          }}
        >
          <Image
            src="/worldcoin.svg"
            alt="Worldcoin"
            // layout="responsive"
            width={300}
            height={300}
          />
        </Grid>
      </Grid>
    </>
  );
}
