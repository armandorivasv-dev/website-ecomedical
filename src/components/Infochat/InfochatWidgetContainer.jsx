import { useState } from 'react';
import { Box } from '@mui/material';
import { useChatMessages } from '@/hooks/useChatMessages';
import { InfochatWidgetThread } from './InfochatWidgetThread';
import { InfochatWidgetComposer } from './InfochatWidgetComposer';
import { InfochatWidgetHeader } from './InfochatWidgetHeader';

export const InfochatWidgetContainer = ({ onClose }) => {
  const { messages, addUserMessage, addChatMessage } = useChatMessages();
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (userMessage) => {
    addUserMessage(userMessage);
    setIsLoading(true);
    try {
      const response = await fetch('/api/infochat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      const data = await response.json();
      addChatMessage(data.answer);
    } catch (error) {
      console.error('Error al contactar la API:', error);
      addChatMessage('Lo siento, ocurrió un error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InfochatWidgetHeader onClose={onClose} />
      <InfochatWidgetThread
        messages={messages}
        isLoading={isLoading}
      />
      <InfochatWidgetComposer
        onSend={handleSend}
        isLoading={isLoading}
      />
    </Box>
  );
};
