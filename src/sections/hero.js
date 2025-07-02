import { useState } from 'react';
import { Box, Stack, Typography, Button, useMediaQuery, Container } from '@mui/material';
import { ContactForm } from '../components/contact-form';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { getImageProps } from 'next/image';
import { green } from '@/styles/get-custom-theme';

export const Hero = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const heroImage = mdUp
    ? '/assets/images/ecomedical-atencion-medica-domicilio-hero.png'
    : '/assets/images/ecomedical-atencion-medica-domicilio-hero.png';

  const style = {
    height: '100vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundImage: `url(${heroImage})`,
    position: 'relative',
    //mt: 15,
    //display: 'flex',
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundPosition: mdUp ? 'none' : 'center',
    //backgroundRepeat: 'no-repeat',
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
            paddingLeft: mdUp ? 8 : 4,

            //height: '80%',
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            sx={{ pt: mdUp ? '30vh' : '25vh' }}
          >
            <LocalHospitalIcon
              color='primary'
              sx={{ color: green[300] }}
            />
            <Typography
              variant='h6'
              color={green[300]}
              maxWidth={600}
              textAlign='left'
            >
              BIENVENIDOS A ECOMEDICAL
            </Typography>
          </Stack>

          <Typography
            variant={mdUp ? 'h1' : 'h3'}
            color='white'
            textAlign='left'
            maxWidth={600}
          >
            Estamos aquí para escuchar y sanar sus problemas de salud
          </Typography>

          <Typography
            variant='h6'
            color='white'
            maxWidth={600}
            textAlign='left'
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
            sx={{ pt: 2 }}
          >
            <Button
              variant='contained'
              //color='primary'
              size='large'
              onClick={handleOpenContactForm}
            >
              CALLCENTER
            </Button>
            <Button
              variant='outlined'
              //backgroundColor='primary.main'
              sx={{ borderColor: 'white', color: 'white' }}
              size='large'
              onClick={handleOpenContactForm}
            >
              ESCRÍBENOS
            </Button>
          </Stack>
        </Stack>
        <Box
          position='absolute'
          bottom='1%'
          left='50%'
          sx={{
            //transform: 'translateX(-50%)',
            zIndex: 2,
            //display: { xs: 'none', md: 'block' },
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
