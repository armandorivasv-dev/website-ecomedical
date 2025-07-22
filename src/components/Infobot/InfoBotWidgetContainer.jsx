import { useState } from 'react';
import { Box } from '@mui/material';
import { useChatMessages } from '@/hooks/useChatMessages';
import { InfobotWidgetThread } from './InfobotWidgetThread';
import { InfobotWidgetComposer } from './InfobotWidgetComposer';
import { InfobotWidgetHeader } from './InfobotWidgetHeader';

export const InfobotWidgetContainer = ({ onClose }) => {
  const { messages, addUserMessage, addBotMessage } = useChatMessages();
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (userMessage) => {
    addUserMessage(userMessage);
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      const data = await response.json();
      addBotMessage(data.answer);
    } catch (error) {
      console.error('Error al contactar la API:', error);
      addBotMessage('Lo siento, ocurrió un error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InfobotWidgetHeader onClose={onClose} />
      <InfobotWidgetThread
        messages={messages}
        isLoading={isLoading}
      />
      <InfobotWidgetComposer
        onSend={handleSend}
        isLoading={isLoading}
      />
    </Box>
  );
};
