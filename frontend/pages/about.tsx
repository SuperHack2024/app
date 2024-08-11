import { Box, Typography, Divider } from '@mui/material';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar.tsx';

export default function About() {
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
          Meet the team
        </Typography>
      </Box>
      <Footer />
    </>
  );
}
