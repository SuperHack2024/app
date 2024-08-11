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
import MenuItem from '@mui/material/MenuItem';
import { LogoIcon } from './Logo';
import { signIn, useSession } from 'next-auth/react';

const pages = ['How it works', 'Create Lottery', 'Partners', 'About'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { data: session, status } = useSession();
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 2,
                  display: 'flex',
                  fontSize: '1.1rem',
                  fontStyle: 'bold',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

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
                Sign in
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </>
  );
}
export default ResponsiveAppBar;
