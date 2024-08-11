'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { LogoIcon } from './Logo';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const pages = [
  { text: 'Games', url: '../games' },
  { text: 'How to play', url: '../how-to-play' },
  { text: 'Create Lottery', url: '../create-lottery' },
  { text: 'Partners', url: '../partners' },
  { text: 'About', url: '../about' },
];

function ResponsiveAppBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (url: string) => {
    router.push(url);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <>
      <AppBar position="static" sx={{ marginY: '1rem' }} />
      <Container>
        <Toolbar disableGutters>
          <div
            style={{
              cursor: 'pointer',
              width: '5rem',
              height: '2rem',
              display: 'inline-block',
              paddingBottom: '1.5rem',
              marginRight: '4rem',
            }}
          >
            <LogoIcon
              onClick={handleLogoClick}
              sx={{
                pr: '5rem',
                py: '1.5rem',
                display: { xs: 'none', md: 'flex' },
              }}
            />
          </div>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <>
                  <Link
                    key={page.url}
                    href={page.url}
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <Typography textAlign="center">{page.text}</Typography>
                  </Link>
                </>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <>
                <Link
                  key={page.url}
                  href={page.url}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      my: 2,
                      mx: 2,
                      display: 'flex',
                      fontSize: '1.5rem',
                      fontStyle: 'bold',
                    }}
                  >
                    {page.text}
                  </Typography>
                </Link>
              </>
            ))}
          </Box>

          {!session?.user && (
            <Box sx={{ mr: 'none' }}>
              <Button
                sx={{
                  boxShadow: 'none',
                  width: '8rem',
                  height: '3rem',
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
                    callbackUrl: 'http://localhost:3000/games',
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
                  Sign in
                </Typography>
              </Button>
            </Box>
          )}
          {session?.user && (
            <Button
              sx={{
                boxShadow: 'none',
                width: '8rem',
                height: '3rem',
                textTransform: 'none',
                borderRadius: '30px',
                backgroundColor: '#1976D2',
                '&:hover': {
                  backgroundColor: '#0052FF',
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: 'http://localhost:3000/' });
              }}
              variant={'contained'}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: '1.5rem',
                }}
              >
                Logout
              </Typography>
            </Button>
          )}
        </Toolbar>
      </Container>
    </>
  );
}
export default ResponsiveAppBar;
