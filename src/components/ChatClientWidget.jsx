import { useState } from 'react';
import { Box, Fab, Fade, Paper, Typography, useMediaQuery } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Importa tu lógica de chat actual. Asumimos que la moviste a este archivo.
import { ChatWidgetInterface } from '@/sections/chat-widget/ChatWidgetInterface';

export const ChatClientWidget = () => {
  // Estado para controlar si la ventana del chat está abierta o cerrada
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <>
      {/* Ventana del Chat */}
      <Fade in={isOpen}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: '140px', // Un poco más arriba que el botón
            right: mdUp ? '2%' : '5%',
            width: mdUp ? '470px' : '90%',
            height: mdUp ? '80vh' : '70vh',
            maxHeight: '800px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
            zIndex: 1300, // Asegura que esté por encima de otros elementos
          }}
        >
          {/* Aquí va tu componente de chat existente */}
          <ChatWidgetInterface />
        </Paper>
      </Fade>

      {/* Botón Flotante */}
      <Fab
        color='primary'
        aria-label='Agente RAG'
        onClick={toggleChat}
        variant='extended'
        sx={{
          position: 'fixed',
          bottom: 86,
          right: 16,
          zIndex: 1301,
        }}
      >
        {/* Cambia el ícono si el chat está abierto o cerrado */}
        {isOpen ? (
          <CloseIcon sx={{ mr: 2, color: 'white', fontSize: mdUp ? 35 : 25 }} />
        ) : (
          <AutoAwesomeIcon sx={{ mr: 2, color: 'white', fontSize: mdUp ? 35 : 25 }} />
        )}
        <Typography
          variant={mdUp ? 'subtitle1' : 'body1'}
          fontWeight={600}
          color='white'
        >
          Asistente de Consultas
        </Typography>
      </Fab>
    </>
  );
};
