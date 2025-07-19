import { useState } from 'react';
import { Box, Button, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const ChatWidgetComposer = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await onSend?.(message);
      setMessage('');
    } catch (error) {
      // Manejo de error si lo deseas
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Box sx={{ backgroundColor: 'grey.200' }}>
      <Box sx={{ display: 'flex', gap: 1, p: 2 }}>
        <TextField
          fullWidth
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder='Escribe tu mensaje...'
          multiline
          minRows={1}
          maxRows={4}
          size={mdUp ? 'medium' : 'small'}
          sx={{ backgroundColor: 'white' }}
        />
        <Button
          variant='contained'
          onClick={handleSend}
          disabled={!message.trim()}
          size={mdUp ? 'large' : 'medium'}
        >
          Enviar
        </Button>
      </Box>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={1}
        sx={{ paddingBottom: mdUp ? 2 : 1 }}
      >
        <Image
          src='/assets/logos/armandorivasv-dev-isotipo-xxs.png'
          alt='armandorivasv-dev-isotipo'
          width={25}
          height={25}
        />
        <Typography
          textAlign='center'
          variant={mdUp ? 'body1' : 'body2'}
          color='text.secondary'
        >
          {'Powered by '}
          <Link
            href='https://www.armandorivasv.dev/'
            target='_blank'
            style={{ textDecoration: 'none', color: 'primary.main' }}
          >
            @armandorivasv.dev&nbsp;
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};
