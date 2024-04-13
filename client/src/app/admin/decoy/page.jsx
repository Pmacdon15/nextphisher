"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import adminStyles from "../adminStyles.module.css";

const Home = () => {
  const backEndPort = process.env.BACK_END_PORT || 3069;
  const [userList, setUserList] = useState([]);

  const message = "Alert!";
  const socket = io(`ws://localhost:${backEndPort}`);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to relay server!!!");
    });
    socket.on("UserList", (userList) => {
      // Remove null values from the user list and duplicate values
      userList = userList.filter(
        (user, index) => userList.indexOf(user) === index && user !== null
      );
      console.log("UserList", userList);
      setUserList(userList);
    });
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  // function sendMessageToUser(userId, message) {
  //   // Emit a message to the room named after the userId
  //   io.to(userId).emit('message', message);
  // }
  return (
    <div className={adminStyles.container}>
      <h2 className={adminStyles.title}>Decoy Dashboard</h2>
      <div className={adminStyles.dataContainer}>
        {userList ? (
          <>
            <div className={adminStyles.contentRow}>
              <div className={adminStyles.data}>
                <h2>Connected Users</h2>
                {userList.map((user) => (
                  <div key={user} className={adminStyles.userData}>
                    <h3>{user}</h3>
                    {/* Additional user data can be added here */}
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => socket.emit("alert", "Alerting from Decoy")} 
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
