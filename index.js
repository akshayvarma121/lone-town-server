const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// ✅ CORS middleware for Express
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://lone-town-client.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ Socket.io with matching CORS
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://lone-town-client.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
