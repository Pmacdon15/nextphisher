'use client'
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import adminStyles from "../adminStyles.module.css";

const Home = () => {
  const [socket, setSocket] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const backEndIp = process.env.NEXT_PUBLIC_BACK_END_IP;
    const backEndPort = process.env.NEXT_PUBLIC_BACK_END_PORT;
    const newSocket = io(`ws://${backEndIp}:${backEndPort}`);

    setSocket(newSocket);

    newSocket.emit("join", "Decoy Controller");

    newSocket.on("connect", () => {
      console.log("Connected to relay server!!!");
    });

    newSocket.on("UserList", (userList) => {
      userList = userList.filter(
        (user, index) => userList.indexOf(user) === index && user !== null
      );
      userList = userList.filter((user) => user !== "Decoy Controller");
      setUserList(userList);
    });

    return () => {
      console.log("Disconnecting from relay server!!!");
      newSocket.disconnect();
    };
  }, []);

  const handleAlertClick = (userId) => {
    if (socket) {
      socket.emit("alert", "Alerting from Decoy", { userId: `${userId}` });
    } else {
      console.error("Socket is not initialized.");
    }
  };

  return (
    <div className={adminStyles.container}>
      <h2 className={adminStyles.title}>Decoy Dashboard</h2>
      <div className={adminStyles.dataContainer}>
        {userList ? (
          <>
            <div className={adminStyles.contentRow}>
              {userList.map((user) => (
                <div key={user} className={adminStyles.userData}>
                  <div className={adminStyles.data}>
                    <h2>Connected User</h2>
                    <h3>{user}</h3>
                    <div className={adminStyles.alertOptions}>
                    <TextField
                      id="outlined-basic"
                      label="Message"
                      variant="standard"
                      color="success"
                      style={{marginBottom: "1%"}}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAlertClick(user)}
                    >
                      Alert
                    </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h3 className={adminStyles.title}>Loading or Not Signed In</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
