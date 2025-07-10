import { useState } from 'react';
import { Box, Stack, Typography, Button, Container } from '@mui/material';
import { ContactForm } from '../components/contact-form';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { green } from '@/styles/get-custom-theme';

export const Hero = () => {
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
            paddingLeft: { xs: 4, md: 8 },
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            sx={{ pt: { xs: '22vh', md: '30vh' } }}
          >
            <LocalHospitalIcon
              color='primary'
              sx={{ color: green[300] }}
            />
            <Typography
              variant='subtitle1'
              sx={(theme) => ({
                [theme.breakpoints.up('md')]: { ...theme.typography.h6 },
              })}
              color={green[300]}
              maxWidth={600}
              textAlign='left'
            >
              BIENVENIDOS A ECOMEDICAL
            </Typography>
          </Stack>

          <Typography
            variant='h4'
            sx={(theme) => ({
              [theme.breakpoints.up('md')]: { ...theme.typography.h1 },
            })}
            color='white'
            textAlign='left'
            maxWidth={600}
          >
            Estamos aquí para escuchar y sanar sus problemas de salud
          </Typography>

          <Typography
            variant='subtitle1'
            color='white'
            maxWidth={600}
            textAlign='left'
            sx={(theme) => ({
              [theme.breakpoints.up('md')]: { ...theme.typography.h6 },
            })}
          >
            EcoMedical - Su socio de confianza en el cuidado de la salud
          </Typography>
          <Typography
            variant='subtitle2'
            color='white'
            maxWidth={600}
            textAlign='left'
          >
            Atención médica integral con médicos expertos, tecnología avanzada y un servicio compasivo. Su salud,
            nuestra prioridad.
          </Typography>
          <Stack
            direction={{ xs: 'row', md: 'row' }}
            spacing={2}
            sx={{ pt: { xs: 0, md: 2 } }}
          >
            <Button
              variant='contained'
              size='large'
              href='https://wa.me/56977013227'
              target='_blank'
            >
              CALLCENTER
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
          display={{ xs: 'none', md: 'block' }}
          position='absolute'
          bottom={{ xs: '10vh', md: '1vh' }}
          left={{ xs: '45vw', md: '50vw' }}
          sx={{
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
