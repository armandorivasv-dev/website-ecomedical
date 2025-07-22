import { useState } from 'react';
import { Box } from '@mui/material';
import { useChatMessages } from '@/hooks/useChatMessages';
import { InfoBotWidgetThread } from './InfoBotWidgetThread';
import { InfoBotWidgetComposer } from './InfoBotWidgetComposer';
import { InfoBotWidgetHeader } from './InfoBotWidgetHeader';

export const InfoBotWidgetContainer = ({ onClose }) => {
  const { messages, addUserMessage, addInfobotMessage } = useChatMessages();
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
      addInfobotMessage(data.answer);
    } catch (error) {
      console.error('Error al contactar la API:', error);
      addInfobotMessage('Lo siento, ocurrió un error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InfoBotWidgetHeader onClose={onClose} />
      <InfoBotWidgetThread
        messages={messages}
        isLoading={isLoading}
      />
      <InfoBotWidgetComposer
        onSend={handleSend}
        isLoading={isLoading}
      />
    </Box>
  );
};
