"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import adminStyles from "../adminStyles.module.css";

const Home = () => {
  // const backEndPort = process.env.BACK_END_PORT || 3069;
  const [userList, setUserList] = useState([]);
  const backEndIp = process.env.NEXT_PUBLIC_BACK_END_IP;
  const backEndPort = process.env.NEXT_PUBLIC_BACK_END_PORT;
  const socket = io(`ws://${backEndIp}:${backEndPort}`);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to relay server!!!");
      socket.emit("requestUserList");      
    });
    socket.on("UserList", (userList) => {
      userList = userList.filter(
        (user, index) => userList.indexOf(user) === index && user !== null
      );
      console.log("UserList", userList);
      setUserList(userList);
    });
  });

  
  

  
  return (
    <div className={adminStyles.container}>
      <h2 className={adminStyles.title}>Decoy Dashboard</h2>
      <div className={adminStyles.dataContainer}>
        {userList ? (
          <>
            <div className={adminStyles.contentRow}>
              <div className={adminStyles.data}>
                <h2>Connected User</h2>
                {userList.map((user) => (
                  <div key={user} className={adminStyles.userData}>
                    <h3>{user}</h3>
                    {/* Additional user data can be added here */}
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => socket.emit("alert", "Alerting from Decoy",{userId:`${user}`})} 
                    >
                      Alert
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <h3 className={adminStyles.title}>Loading or Not Signed In</h3>
        )}
      </div>
      <div className={adminStyles.contentRow}>
        <Button
          variant="contained"
          color="success"
          onClick={() => router.push("/admin")}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default Home;
