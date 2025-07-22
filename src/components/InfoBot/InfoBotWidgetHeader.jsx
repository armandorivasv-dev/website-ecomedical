import { Avatar, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const InfoBotWidgetHeader = ({ onClose }) => {
  return (
    <Box sx={{ p: 2, backgroundColor: 'white', borderBottom: '1px solid', borderColor: 'grey.300' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <IconButton
          onClick={onClose}
          size='small'
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <AutoAwesomeIcon />
        </Avatar>
        <Box>
          <Typography
            variant='subtitle1'
            fontWeight='bold'
          >
            Asistente de Consultas
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
          >
            Normalmente responde instantáneamente
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
