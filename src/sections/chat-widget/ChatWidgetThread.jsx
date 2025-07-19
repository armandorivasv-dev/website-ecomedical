import { Box, Typography, useMediaQuery } from '@mui/material';

export const ChatWidgetThread = ({ messages }) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Box
      component='main'
      sx={{
        flex: '1 1 auto', // Clave: Permite que este Box crezca y ocupe el espacio
        overflowY: 'auto', // Clave: Habilita el scroll vertical cuando el contenido excede el tamaño
        p: 2,
        backgroundColor: 'grey.200',
      }}
    >
      {/* El contenido de los mensajes no cambia */}
      {messages.length === 0 ? (
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ textAlign: 'center', mt: 4 }}
        >
          ¡Empieza la conversación!
        </Typography>
      ) : (
        messages.map(({ id, role, content }) => (
          <Box
            key={id}
            sx={{ mb: 2, textAlign: role === 'user' ? 'right' : 'left' }}
          >
            <Typography
              variant={mdUp ? 'body1' : 'body2'}
              sx={{
                display: 'inline-block',
                bgcolor: role === 'user' ? 'primary.main' : 'white',
                color: role === 'user' ? 'primary.contrastText' : 'text.primary',
                borderRadius: 2,
                px: 2,
                py: 1,
              }}
            >
              {content}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};
