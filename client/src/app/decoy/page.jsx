"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const Home = () => {
  const socket = io("ws://localhost:3069");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to relay server!!!");
    });

    socket.on("alert", (message, { userId }) => {
      if (socket.userId === userId.userId) {
        console.log("Alerting user with message: ", message);
        alert(message);
      }
      console.log("UserId:", userId);
      console.log(`Alerting user with message: ${message}`);
      alert(message);
      //}
      // Handle sending the message to the user or do any other necessary logic here
    });

    // Log any errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // // Cleanup function
    // return () => {
    //   // Disconnect socket when component unmounts
    //   socket.disconnect();
    // };
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  const [ipv4, setIpv4] = useState(null);

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

  socket.emit("join", ipv4);
  socket.userId = ipv4;
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
