import { useState } from 'react';
import { Box } from '@mui/material';
import { useChatMessages } from '@/hooks/useChatMessages';
import { InfoBotWidgetThread } from './InfoBotWidgetThread';
import { InfoBotWidgetComposer } from './InfoBotWidgetComposer';

export const InfoBotWidgetContainer = () => {
  const { messages, addUserMessage, addIaMessage } = useChatMessages();
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
      addIaMessage(data.answer);
    } catch (error) {
      console.error('Error al contactar la API:', error);
      addIaMessage('Lo siento, ocurrió un error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Usamos un Box con flex para que ocupe todo el espacio del Paper
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
