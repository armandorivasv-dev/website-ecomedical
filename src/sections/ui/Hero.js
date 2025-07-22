'use client';
import { useState } from 'react';
import { Box, Stack, Typography, Button, Container, useMediaQuery } from '@mui/material';
import { ContactForm } from '../../components/ContactForm';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { green } from '@/styles/getCustomTheme';

export const Hero = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const style = {
    height: '100vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundImage: {
      xs: `url('/assets/images/ecomedical-atencion-medica-domicilio-hero-mobile.png')`,
      md: `url('/assets/images/ecomedical-atencion-medica-domicilio-hero-desktop.png')`,
    },
    position: 'relative',
    backgroundPosition: { xs: 'center', md: 'top left' },
    backgroundRepeat: 'no-repeat',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1,
    },
  };

  const [openContactForm, setOpenContactForm] = useState(false);
  const handleOpenContactForm = () => setOpenContactForm(true);
  const handleCloseContactForm = () => setOpenContactForm(false);
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={style}>
      <Container maxWidth='lg'>
        <Stack
          direction='column'
          justifyContent='flex-end'
          alignItems='flex-start'
          spacing={2}
          sx={{
            position: 'relative',
            zIndex: 2,
            paddingLeft: { xs: 0, md: 8 },
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            sx={{ pt: { xs: '10vh', md: '20vh' } }}
          >
            <LocalHospitalIcon
              color='primary'
              sx={{ color: green[300] }}
            />
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              color={green[300]}
              maxWidth={600}
              textAlign='left'
            >
              BIENVENIDOS A ECOMEDICAL
            </Typography>
          </Stack>

          <Typography
            variant={isMobile ? 'h4' : 'h1'}
            color='white'
            textAlign='left'
            maxWidth={600}
          >
            Servicios Médicos a Domicilio y Telemedicina de Cardiología en la comodidad de su hogar.
          </Typography>

          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            color='white'
            maxWidth={600}
            textAlign='left'
          >
            Realización de Ecotomografias Generales, Ecotomografía Doppler color y Ecocardiograma, Holters cardiacos y
            de ritmo, y Electrocardiograma.
          </Typography>
          <Typography
            variant='subtitle2'
            color='white'
            maxWidth={600}
            textAlign='left'
          >
            Servicio de Rayos X Digital, Laboratorio, y Medicina General.
          </Typography>
          <Stack
            direction='row'
            spacing={2}
            sx={{ pt: { xs: 0, md: 2 } }}
          >
            <Button
              variant='contained'
              size='large'
              href='https://wa.me/56977013227'
              target='_blank'
            >
              AGENDA UNA CITA
            </Button>
            <Button
              variant='outlined'
              sx={{ borderColor: 'white', color: 'white' }}
              size='large'
              onClick={handleOpenContactForm}
            >
              ESCRÍBENOS
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            bottom: { xs: '10vh', md: '1vh' },
            left: { xs: '45vw', md: '50vw' },
            zIndex: 2,
          }}
        >
          <ArrowCircleDownIcon
            onClick={handleScroll}
            style={{ cursor: 'pointer' }}
            sx={{ fontSize: '60px', color: 'white' }}
          />
        </Box>
      </Container>
      <ContactForm
        open={openContactForm}
        handleClose={handleCloseContactForm}
      />
    </Box>
  );
};
