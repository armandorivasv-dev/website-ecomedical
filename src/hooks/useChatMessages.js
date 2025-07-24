'use client';
import { useState } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 'bienvenida',
    role: 'infochat',
    content: '¡Hola! Soy tu asistente de Consultas Médicas. ¿En qué puedo ayudarte hoy?',
  },
];

export const useChatMessages = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const addUserMessage = (content) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content }]);
  };

  const addChatMessage = (content) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'infochat', content }]);
  };

  const clearMessages = () => setMessages(INITIAL_MESSAGES);

  return { messages, addUserMessage, addChatMessage, clearMessages };
};
