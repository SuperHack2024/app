import { Box, Typography, Divider, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar.tsx';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <TopBar />
      <Divider />
      <Typography
        variant="h3"
        sx={{
          paddingX: '4rem',
          paddingY: '4rem',
        }}
      >
        Meet the team
      </Typography>
      <Box
        sx={{
          display: 'flex',
          marginTop: '3vh',
          height: '60vh',
          flexDirection: 'row',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            paddingX: '10rem',
            paddingY: '1rem',
          }}
        >
          <Grid xs={4}>
            <Image src="/isaac.jpeg" alt="Isaac" width={300} height={300} />
          </Grid>
          <Grid xs={8}>
            <Typography
              variant="h4"
              sx={{
                paddingX: '4rem',
                paddingY: '3rem',
              }}
            >
              Isaac Garcia - Software Engineer
            </Typography>
            <Typography
              variant="h6"
              sx={{
                paddingX: '4rem',
                paddingY: '2rem',
              }}
            ></Typography>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.linkedin.com/in/isaacwgarcia/`}
              passHref
            >
              <Typography
                variant="h4"
                sx={{
                  paddingX: '4rem',
                  paddingY: '1rem',
                }}
              >
                Linkedin profile
              </Typography>
            </Link>
          </Grid>

          <Grid xs={4}>
            <Image src="/hector.jpeg" alt="Isaac" width={300} height={300} />
          </Grid>
          <Grid xs={8}>
            <Typography
              variant="h4"
              sx={{
                paddingX: '4rem',
                paddingY: '2rem',
              }}
            >
              Hector Longarte - Software Engineer
            </Typography>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.linkedin.com/in/hector-longarte/`}
              passHref
            >
              <Typography
                variant="h4"
                sx={{
                  paddingX: '4rem',
                  paddingY: '1rem',
                }}
              >
                Linkedin profile
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
