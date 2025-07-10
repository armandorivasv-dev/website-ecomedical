import React from 'react';
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Typography } from '@mui/material';
import Link from 'next/link';

export const WhatsappFab = () => {
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
          bottom: 16,
          right: 16,
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        <WhatsAppIcon sx={{ mr: 1, color: 'black' }} />
        <Typography
          variant='body1'
          fontWeight={600}
          color='black'
        >
          ¿Como podemos ayudarte?
        </Typography>
      </Fab>
    </Link>
  );
};
