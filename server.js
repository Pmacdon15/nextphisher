import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let connectedUsers = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

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

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
