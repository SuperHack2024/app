import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LinearProgress } from '@mui/material';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Auth() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return <LinearProgress />;
  }

  if (!session) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Link
          href={`/api/auth/signin`}
          style={{
            textDecoration: 'none',
            color: 'white',
          }}
        >
          <br />
          <Button
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
            onClick={(e) => {
              e.preventDefault();
              signIn('worldcoin', {
                callbackUrl: 'http://localhost:3000/stats',
              });
            }}
            variant={'contained'}
          >
            <Typography
              component="span"
              sx={{
                fontSize: '1.5rem',
              }}
            >
              Play now
            </Typography>
          </Button>
        </Link>
      </Box>
    );
  }

  if (session) {
    return (
      <Box sx={{ color: 'white' }}>
        <Button
          onClick={() => {
            signOut({ callbackUrl: 'http://localhost:3000/' });
          }}
          variant={'contained'}
        >
          Sign out
        </Button>
      </Box>
    );
  }
}
