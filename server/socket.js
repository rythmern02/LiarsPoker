import { Server } from 'socket.io';

const rooms = new Map();

export default function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    const { roomId, address } = socket.handshake.query;
    console.log(`Client connected: ${address} to room ${roomId}`);

    socket.on('joinRoom', ({ roomId, address }) => {
      socket.join(roomId);
      
      // Initialize room if it doesn't exist
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }
      
      // Add player to room
      rooms.get(roomId).add(address);
      
      // Convert Set to Array for sending to clients
      const players = Array.from(rooms.get(roomId)).map(addr => ({
        address: addr
      }));
      
      // Broadcast updated player list
      io.to(roomId).emit('playerJoined', players);
      console.log(`Player ${address} joined room ${roomId}. Players:`, players);
    });

    socket.on('leaveRoom', ({ roomId, address }) => {
      if (rooms.has(roomId)) {
        rooms.get(roomId).delete(address);
        const players = Array.from(rooms.get(roomId)).map(addr => ({
          address: addr
        }));
        io.to(roomId).emit('playerLeft', players);
        console.log(`Player ${address} left room ${roomId}. Players:`, players);
      }
      socket.leave(roomId);
    });

    socket.on('startGame', ({ roomId, address }) => {
      const gameData = {
        startTime: Date.now(),
        players: Array.from(rooms.get(roomId))
      };
      io.to(roomId).emit('gameStarted', gameData);
      console.log(`Game started in room ${roomId}`);
    });

    socket.on('makeBid', ({ roomId, address, digit, quantity }) => {
      io.to(roomId).emit('newBid', { address, digit, quantity });
      console.log(`New bid in room ${roomId}:`, { address, digit, quantity });
    });

    socket.on('callLiar', ({ roomId, address }) => {
      io.to(roomId).emit('liarCalled', { address });
      console.log(`Liar called in room ${roomId} by ${address}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${address}`);
      if (roomId && rooms.has(roomId)) {
        rooms.get(roomId).delete(address);
        const players = Array.from(rooms.get(roomId)).map(addr => ({
          address: addr
        }));
        io.to(roomId).emit('playerLeft', players);
      }
    });
  });

  return io;
} 