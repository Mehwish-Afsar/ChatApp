const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const ENV = require("./env");
const socketAuthMiddleware = require("../middleware/socketAuthMiddleware");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true
    }
});


// Apply authentication to all Socket connections
io.use(socketAuthMiddleware);

// Store connected users
const userSocketMap = {};

// Get socket ID of a specific user
function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("A user connected", socket.user.fullName);

    const userId = socket.userId;

    // Store user's socket ID
    userSocketMap[userId] = socket.id;

    // Send online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.fullName);

        delete userSocketMap[userId];

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

module.exports = {
    io,
    app,
    server,
    getReceiverSocketId,
    userSocketMap
};