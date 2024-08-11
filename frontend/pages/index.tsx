import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import Auth from '../components/Auth';
import { Box } from '@mui/material';
import TopBar from '@/components/TopBar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Footer from '@/components/Footer';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session: JSON.stringify(session),
    },
  };
}

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <>
      <TopBar />
      <Divider />
      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: '1rem',
          textAlign: 'center',
        }}
      >
        <Grid
          xs={8}
          sx={{
            paddingX: '6rem',
            paddingY: '14rem',
          }}
        >
          <Typography variant="h1">Sign in. Play. Win.</Typography>

          <Typography
            variant="h4"
            sx={{
              paddingY: '2rem',
            }}
          >
            Just sign in with Worldcoin ID and join the only one Ethereum
            lottery with No syndicates allowed.
          </Typography>
          <Typography
            variant="h4"
            sx={{
              paddingY: '2rem',
            }}
          >
            All ETH collected is won weekly, verifyable on the BASE Blockchain.
          </Typography>
          <Typography
            variant="h4"
            sx={{
              paddingY: '2rem',
            }}
          >
            CRYPTO LOTTERY™ is also a tool for content creators and companies
            looking for ways to reward their communities with giveaways in ETH
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              width: '100%',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            {!session ? (
              <Auth />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    paddingY: '2rem',
                  }}
                >
                  You still have an active session with Worldcoin.
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid xs={4}>
          <Image
            src="/landing-tickets.png"
            alt="Landing Image"
            layout="responsive"
            width={500}
            height={300}
          />
        </Grid>
      </Grid>
    </>
  );
}
