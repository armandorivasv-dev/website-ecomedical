import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { ContactForm } from '.';

export const ButtonContactForm = () => {
  const [openContactForm, setOpenContactForm] = useState(false);

  const handleOpenContactForm = () => setOpenContactForm(true);
  const handleCloseContactForm = () => setOpenContactForm(false);

  return (
    <Box sx={{ py: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Button
        variant='contained'
        onClick={handleOpenContactForm}
      >
        Formulario de Contacto
      </Button>
      <ContactForm
        open={openContactForm}
        handleClose={handleCloseContactForm}
      />
    </Box>
  );
};
