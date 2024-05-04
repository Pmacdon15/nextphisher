"use client";
import { useEffect, useState } from "react";
import { socket } from "../socket.js";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      socket.emit("join", "Decoy");
      socket.on("UserList", handleUserList);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
      // Remove event listener when disconnecting
      socket.off("UserList", handleUserList);
    }

    // Define function to handle "UserList" event
    function handleUserList(userList) {
      userList = userList.filter(
        (user, index) => userList.indexOf(user) === index && user !== null
      );
      userList = userList.filter((user) => user !== "Decoy Controller");
      setUserList(userList);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // Clean up by removing the event listener
      socket.off("UserList", handleUserList);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <p>User List: {userList.join(", ")}</p>
    </div>
  );
}
