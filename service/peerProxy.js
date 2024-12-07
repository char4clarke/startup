const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  let connections = [];

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    ws.on('message', async function message(data) {
      console.log('Raw message received:', data.toString());
      try {
        const message = JSON.parse(data);
        console.log('Parsed message:', message);
    
        if (!message.type) {
          console.error('Message type is undefined:', message);
          return;
        }
    
        switch (message.type) {
          case 'fetchActivities':
            console.log('Fetching activities for user:', message.userId);
            const activities = await DB.getActivities(message.userId);
            console.log('Activities fetched:', activities);
            ws.send(JSON.stringify({ type: 'activities', activities }));
            break;
          case 'updateTimeframe':
            console.log(`Timeframe updated for user ${message.userId}: ${message.timeframe}`);
            break;
          default:
            console.log('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      const pos = connections.findIndex((o) => o.id === connection.id);
      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        console.log('Terminating inactive WebSocket connection');
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 30000);

  console.log('WebSocket server set up successfully');
}

module.exports = { peerProxy };