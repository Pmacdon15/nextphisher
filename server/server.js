const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
//const path = require("path");

const app = express();
const server = http.createServer(app);

// const AuthManager = require("./auth.js");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

const io = socketIo(server, {
  cors: { origin: "*" },
});

let connectedUsers = {}; // Define connectedUsers globally
//MARK: socket.io connection
io.on("connection", (socket) => {
  console.log("a user connected");

  //MARK: Join
  socket.on("join", (userId) => {
    console.log(`${userId} joined`);
    socket.userId = userId;
    connectedUsers[socket.id] = userId;
    console.log("User List: " + JSON.stringify(connectedUsers));
    io.emit("UserList", Object.values(connectedUsers));
  });
  //MARK: Alert
  socket.on("alert", (message, userId) => {
    console.log("Alerting with message", message);
    console.log("User ID:", userId.userId);
    socket.userId = userId;
    io.emit("alert", message, userId);
  });
  //MARK: Push to page
  socket.on("pushToPage", (site, userId) => {
    console.log("Pushing to page", site);
    console.log("User ID:", userId.userId);
    socket.userId = userId;
    io.emit("pushToPage", site, userId);
  });
  //MARK: Disconnect
  socket.on("disconnect", () => {
    delete connectedUsers[socket.id];
    console.log("User List: " + JSON.stringify(connectedUsers));
    io.emit("UserList", Object.values(connectedUsers));
  });
});

const PORT = process.env.PORT || 3069;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
