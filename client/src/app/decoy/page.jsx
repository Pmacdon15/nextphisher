'use client';
import { useEffect, useState } from "react";
import io from "socket.io-client";
import decoyStyles from "./decoy.module.css";

const Home = () => {
  const [socket, setSocket] = useState(null);
  const [ipv4, setIpv4] = useState(null);

  useEffect(() => {
    const backEndIp = process.env.NEXT_PUBLIC_BACK_END_IP;
    const backEndPort = process.env.NEXT_PUBLIC_BACK_END_PORT;

    // Create a new WebSocket connection
    const newSocket = io(`ws://${backEndIp}:${backEndPort}`);

    // Set up event listeners
    newSocket.on("connect", () => {
      console.log("Connected to relay server!!!");
    });

    newSocket.on("alert", (message, { userId }) => {
      if (userId === newSocket.userId) {
        console.log("Alerting user with message: ", message);
        alert(message);
      }
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // Store the socket instance in state
    setSocket(newSocket);

    // Cleanup function
    return () => {
      // Disconnect socket when component unmounts
      console.log("Disconnecting from relay server!!!");
      newSocket.disconnect();
    };
  }, []); // Only run this effect once on component mount

  useEffect(() => {
    const fetchIPv4 = async () => {
      try {
        const response = await fetch(`https://api.ipify.org?format=json`);

        if (!response.ok) {
          throw new Error("Failed to fetch IPv4 address");
        }
        const result = await response.json();
        setIpv4(result.ip);
        console.log(result.ip);
      } catch (error) {
        console.error("Error fetching IPv4 address:", error.message);
      }
    };

    fetchIPv4();
  }, []);

  console.log(ipv4);

  // Ensure that socket is initialized before emitting events
  useEffect(() => {
    if (socket && ipv4) {
      socket.emit("join", ipv4);
      socket.userId = ipv4;
    }
  }, [socket, ipv4]);

  return (
    <div className={decoyStyles.container}>
      <div className={decoyStyles.header}>
        <h1>Welcome to Exotic Animals Emporium</h1>
      </div>
      <div className={decoyStyles.main}>
        <div className={decoyStyles.animalList}>
          <h2>Available Exotic Animals</h2>
          <ul>
            <li>Lion</li>
            <li>Tiger</li>
            <li>Elephant</li>
            <li>Giraffe</li>
            <li>Monkey</li>
            {/* Add more exotic animals here */}
          </ul>
        </div>
        <div className={decoyStyles.buyingGuide}>
          <h2>How to Buy an Exotic Animal</h2>
          <p>Follow these simple steps to purchase your dream exotic animal:</p>
          <ol>
            <li>Choose the animal you want to buy from our list.</li>
            <li>Contact us via email or phone to inquire about the availability and price.</li>
            <li>Arrange for the purchase and delivery of your exotic pet.</li>
            <li>Enjoy your new exotic companion!</li>
          </ol>
        </div>
      </div>
      <div className={decoyStyles.footer}>
        <p>&copy; 2024 Exotic Animals Emporium. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
