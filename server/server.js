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

io.on("connection", (socket) => {
  console.log("a user connected");
  

  // Listen for the 'join' event and store the userName with the socket
  socket.on("join", (userId) => {
    console.log(`${userId} joined`);
    socket.userId = userId
    connectedUsers[socket.id] = userId;
    console.log("User List: " + JSON.stringify(connectedUsers)); 
    io.emit("UserList", Object.values(connectedUsers));

  });  
  // socket.on("requestUserList", () => {
  //   // Send the list of connected users to the client
  //   io.emit("UserList", Object.values(connectedUsers));
  // });
  // socket.on("UserList", (userList) => {
  //   userList = userList.filter(
  //     (user, index) => userList.indexOf(user) === index && user !== null
  //   );
  //   console.log("UserList", userList);
  // });
  
  socket.on("alert", (message, userId) => {
    console.log("Alerting with message", message);
    console.log("User ID:", userId.userId);
    socket.userId = userId;
    io.emit("alert", message, userId);
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
    delete connectedUsers[socket.id];
    console.log("User List: " + JSON.stringify(connectedUsers));
    io.emit("UserList", Object.values(connectedUsers));
  });

 
});

const PORT = process.env.PORT || 3069;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
