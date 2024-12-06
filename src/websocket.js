const socket = new WebSocket('wss://startup.charlesclarke.click/websockets');

socket.onopen = () => {
  console.log('WebSocket connected');
};

socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

export const sendMessage = (message) => {
  socket.send(JSON.stringify(message));
};

export const onMessage = (callback) => {
  socket.onmessage = (event) => {
    callback(JSON.parse(event.data));
  };
};