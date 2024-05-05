"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Image from "next/image";
// import adminImage from "../../../public/admin.png";
import { useState, useEffect } from "react";
import adminStyles from "./adminStyles.module.css";
import Button from "@mui/material/Button";

export default function AdminDashboard() { // Change component name
  const [webSitesInProject, setWebSitesInProject] = useState([]);
  const [userAuth, setUserAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("/api/admin/auth");
        const data = await response.json();
        if (data.message === "Authorized") {
          setUserAuth(true);
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error reading file", error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("./api/admin/sitesInProject");
        const data = await response.json();
        setWebSitesInProject(data.data);
      };
      fetchData();
    } catch (error) {
      console.error("Error reading file", error);
    }
  }, []);

  async function logout() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "Logged Out") {
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging out");
    }
  }
  let firstHalf = [];
  let secondHalf = [];
  if (webSitesInProject !== undefined && webSitesInProject.length > 0) {
    const halfIndex = Math.ceil(webSitesInProject.length / 2);
    firstHalf = webSitesInProject.slice(0, halfIndex);
    secondHalf = webSitesInProject.slice(halfIndex);
  }
  // webSitesInProject !== undefined && webSitesInProject.length > 0 ?

  return (
    <div>
      <h2 className={adminStyles.title}>Admin Dashboard</h2>
      {userAuth ? (
        <>
          {webSitesInProject !== undefined && webSitesInProject.length > 0 ? (
            <div>
              <div className={adminStyles.contentRow}>
                {webSitesInProject.map((webSite, index) => (
                  <Link key={webSite.name} href={`/admin/QrCode/${webSite.name}`}>
                    <div className={adminStyles.siteData}>
                      <p className={adminStyles.par}>
                        Project Name: {webSite.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={adminStyles.contentRow}>
                <Button variant="contained" onClick={() => router.push("/admin/decoy")} color="success" style={{ margin: "1%" }}>
                  Decoy Controller
                </Button>
                <Button variant="contained" onClick={() => router.push("/admin/userData")} color="success" style={{ margin: "1%" }}>
                  User Data
                </Button>
                <Button onClick={logout} variant="contained" color="success" style={{ margin: "1%" }}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      ) : (
        <div>
          <p>Not signed in!</p>
          <Button variant="contained" onClick={() => router.push("/")} color="success">
            Login
          </Button>
        </div>
      )}
    </div>
  );
}


