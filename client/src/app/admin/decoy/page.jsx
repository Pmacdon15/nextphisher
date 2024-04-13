"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Button from "@mui/material/Button";

const Home = () => {
  const socket = io("ws://localhost:3069");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to relay server!!!");
    });

    // socket.on("alert", (message) => {
    //   alert(message);
    // });
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount


 

  

  ;
  return (
    <div>
      <h1>Home</h1>
      <Button variant="contained" color="primary" onClick={() => socket.emit("alert", "Hello from the Server!")}>Alert</Button>
    </div>
  );
}

export default Home;
