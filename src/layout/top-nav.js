import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Stack,
  Drawer,
  MenuItem,
  Typography,
  Divider,
  Container,
  Button,
  Toolbar,
  AppBar,
  Box,
  Menu,
} from '@mui/material';
import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import MenuIcon from '@mui/icons-material/Menu';
import { Instagram } from '@mui/icons-material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';

const menuItems = [
  {
    id: 0,
    title: 'Inicio',
    value: 'home',
  },
  {
    id: 1,
    title: 'Nosotros',
    value: 'about-us',
  },
  {
    id: 2,
    title: 'Servicios',
    value: 'services',
  },
  {
    id: 3,
    title: 'Como trabajamos',
    value: 'steps',
  },
];

function TopNav({ mode }) {
  const [open, setOpen] = useState(false);
  const [openContactForm, setOpenContactForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenContactForm = () => setOpenContactForm(true);
  const handleCloseContactForm = () => setOpenContactForm(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <>
      <AppBar
        position='fixed'
        sx={(theme) => ({
          boxShadow: 0,
          bgcolor: 'white',
          backgroundImage: 'none',
          width: '100%',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(24px)',
          boxShadow:
            theme.palette.mode === 'light'
              ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
              : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
        })}
      >
        <Box
          id='home'
          sx={{
            flexGrow: 1,
            display: 'flex',
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            py: { xs: 1, md: 2 },
            px: { xs: 2, md: 30 },
            backgroundColor: 'black',
            width: '100%',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 0, md: 4 }}
          >
            <Stack
              direction={'row'}
              spacing={1}
              justifyContent={'center'}
              alignItems={'center'}
              //sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <LocationOnIcon />
              <Typography
                variant='caption'
                color='white'
              >
                Presidente Ríos 58, Santiago
              </Typography>
            </Stack>

            <Link
              href='mailto:ecomedical.cl@gmail.com'
              style={{ textDecoration: 'none' }}
            >
              <Stack
                direction={'row'}
                spacing={1}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <EmailIcon sx={{ color: 'white' }} />

                <Typography
                  variant='caption'
                  color='white'
                >
                  ecomedical.cl@gmail.com
                </Typography>
              </Stack>
            </Link>

            <Link
              href='https://wa.me/56977013227'
              target='_blank'
              style={{ textDecoration: 'none' }}
            >
              <Stack
                direction={'row'}
                spacing={1}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <PhoneIcon sx={{ color: 'white' }} />
                <Typography
                  variant='caption'
                  color='white'
                >
                  +56 9 7701 3227
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Box>
        <Container maxWidth='lg'>
          <Toolbar
            variant='regular'
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              //borderRadius: '50px',
              width: '100%',

              bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255)' : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              //border: '1px solid',
              //borderColor: 'divider',
              // boxShadow:
              //   theme.palette.mode === 'light'
              //     ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
              //     : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              id='home'
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 0,
              }}
            >
              <Image
                src='/assets/logos/ecomedical-logo.png'
                width={286 * 0.8}
                height={63 * 0.8}
                alt='ecomedical atención medica a domicilio'
                priority={true}
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {menuItems.map((item, index) => (
                  <div key={index}>
                    {item.submenu ? (
                      <>
                        <MenuItem
                          onClick={handleMenuOpen}
                          sx={{ py: '6px', px: '12px' }}
                        >
                          <Typography
                            variant='subtitle1'
                            color='text.primary'
                          >
                            {item.title}
                          </Typography>
                        </MenuItem>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          {item.submenu.map((subItem) => (
                            <MenuItem
                              key={subItem.id}
                              onClick={() => {
                                scrollToSection(subItem.value);
                                handleMenuClose();
                              }}
                              sx={{ py: '6px', px: '12px' }}
                            >
                              <Typography
                                variant='subtitle1'
                                color='text.primary'
                              >
                                {subItem.title}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Menu>
                      </>
                    ) : (
                      <MenuItem
                        onClick={() => scrollToSection(item.value)}
                        sx={{ py: '6px', px: '12px' }}
                      >
                        <Typography
                          variant='subtitle1'
                          color='text.primary'
                        >
                          {item.title}
                        </Typography>
                      </MenuItem>
                    )}
                  </div>
                ))}
                <MenuItem
                  onClick={handleOpenContactForm}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography
                    variant='subtitle1'
                    color='text.primary'
                  >
                    Contacto
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box sx={{ display: { xs: '', md: 'none' } }}>
              <Button
                variant='text'
                color='primary'
                aria-label='menu'
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Image
                    src='/assets/logos/ecomedical-logo.png'
                    width={286 * 0.6}
                    height={63 * 0.6}
                    alt='ecomedical atención medica a domicilio'
                    priority={true}
                  />
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      {item.submenu ? (
                        <>
                          <MenuItem
                            onClick={handleMenuOpen}
                            sx={{ py: '6px', px: '12px' }}
                          >
                            <Typography
                              variant='subtitle1'
                              color='text.primary'
                            >
                              {item.title}
                            </Typography>
                          </MenuItem>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            {item.submenu.map((subItem) => (
                              <MenuItem
                                key={subItem.id}
                                onClick={() => {
                                  scrollToSection(subItem.value);
                                  handleMenuClose();
                                }}
                                sx={{ py: '6px', px: '12px' }}
                              >
                                <Typography
                                  variant='subtitle1'
                                  color='text.primary'
                                >
                                  {subItem.title}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Menu>
                        </>
                      ) : (
                        <MenuItem
                          onClick={() => scrollToSection(item.value)}
                          sx={{ py: '6px', px: '12px' }}
                        >
                          <Typography
                            variant='subtitle1'
                            color='text.primary'
                          >
                            {item.title}
                          </Typography>
                        </MenuItem>
                      )}
                    </div>
                  ))}
                  <MenuItem
                    onClick={handleOpenContactForm}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography
                      variant='subtitle1'
                      color='text.primary'
                    >
                      Contacto
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <Stack
                    direction='row'
                    justifyContent='center'
                    spacing={1}
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    <IconButton
                      href='https://www.instagram.com/ecomedical.cl/'
                      target='_blank'
                      aria-label='Instagram'
                      sx={{ alignSelf: 'center', color: 'primary.main' }}
                    >
                      <Instagram />
                    </IconButton>
                  </Stack>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ContactForm
        open={openContactForm}
        handleClose={handleCloseContactForm}
      />
    </>
  );
}

TopNav.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default TopNav;
