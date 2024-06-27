const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const gameLogic = require('./game-logic');
const cors = require('cors');

const app = express();
app.use(cors(
    origin="*",
    credential=true,
));
const server = http.createServer(app);
const io = socketio(server);

// Define route handler for the root URL
app.get('/', (req, res) => {
  // Send a response with some content for the homepage
  res.send('Welcome to my game server!');
});

// Set up Socket.IO event handlers
io.on('connection', client => {
  gameLogic.initializeGame(io, client);
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
