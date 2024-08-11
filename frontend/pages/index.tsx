import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Auth from '../components/Auth';
import { AppBar, Box, Button } from '@mui/material';
import TopBar from '@/components/TopBar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Image from 'next/image';

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
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 'bold',
            }}
          >
            Sign in. Play. Win.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              paddingY: '2rem',
            }}
          >
            Pool ETH lottery. No syndicates allowed. Verifyable on the BASE
            Blockchain.
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              paddingY: '2rem',
            }}
          >
            All ETH is won every day.
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <strong> {session?.user?.name}</strong>
                <Button
                  onClick={() => {
                    signOut({ callbackUrl: 'http://localhost:3000/' });
                  }}
                  variant={'contained'}
                >
                  Sign out
                </Button>
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
