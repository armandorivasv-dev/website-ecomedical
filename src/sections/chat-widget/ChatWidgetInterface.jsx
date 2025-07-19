import { Box } from '@mui/material';
import { ChatWidgetThread } from './ChatWidgetThread';
import { ChatWidgetComposer } from './ChatWidgetComposer';
import { useChatMessages } from '@/hooks/useChatMessages';

export const ChatWidgetInterface = () => {
  const { messages, addUserMessage, addIaMessage } = useChatMessages();

  const handleSend = async (userMessage) => {
    addUserMessage(userMessage);
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
    }
  };

  return (
    // Usamos un Box con flex para que ocupe todo el espacio del Paper
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChatWidgetThread messages={messages} />
      <ChatWidgetComposer onSend={handleSend} />
    </Box>
  );
};
