'use client';
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';

export const WhatsappWidget = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Link
      href='https://wa.me/56977013227'
      passHref
      target='_blank'
    >
      <Fab
        variant='extended'
        color='secondary'
        aria-label='Contacto WhatsApp'
        sx={{
          position: 'fixed',
          bottom: { xs: 5, md: 16 },
          right: 16,
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        <WhatsAppIcon sx={{ mr: 2, color: 'black', fontSize: { xs: 25, md: 35 } }} />
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          color='black'
        >
          AGENDA UNA CITA
        </Typography>
      </Fab>
    </Link>
  );
};
