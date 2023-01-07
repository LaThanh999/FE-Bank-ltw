import { BASE_URL } from 'utils/axios';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

export const useSocket = () => {
  const host = BASE_URL;

  const socket = io(host, { transports: ['websocket'] });

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messageReceive, setMessageReceive] = useState<string>('');

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const sendSocket = (value: unknown) => {
    socket.emit('sendDataClient', value);
    setMessageReceive('');
  };

  socket.on('sendDataServer', (data) => {
    setMessageReceive(data);
    setTimeout(() => {
      setMessageReceive('cancel update');
    }, 1000);
  });

  return { isConnected, messageReceiveSocket: messageReceive, sendSocket };
};
