const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: { origin: "*" },
});

let connectedUsers = {}; // Define connectedUsers globally



io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for the 'join' event and store the userName with the socket
  socket.on("join", (userName) => {
    console.log(`${userName} joined`);    
  });

  socket.on("alert", (message) => {
    console.log("Alerting","with message", message);
    io.emit("alert", message);
  });


  socket.on("message", (message) => {
    console.log(socket.userName + " said " + message);

    // Use socket.userName to include the user's name in the message
    if (socket.userName) {
      io.emit("message", `${socket.userName} said: ${message}`);
    } else {
      io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
    }
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    const userName = socket.userName || socket.id;
    // Remove the user from the connectedUsers object
    delete connectedUsers[socket.id];

    // // Emit the 'userList' event with the updated user list
    // io.emit("userList", Object.values(connectedUsers));

    // io.emit("message", `${userName} left the chat`);

    // console.log(`${userName} left the chat`);
  });
});

const PORT = process.env.PORT || 3069;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
