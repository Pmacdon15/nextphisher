"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import adminImage from "../../../public/admin.png";
import { useState, useEffect } from "react";
import adminStyles from "./adminStyles.module.css";
import Button from "@mui/material/Button";

export default function AdminDashboard() { // Change component name
  const [webSitesInProject, setWebSitesInProject] = useState([]);
  const router = useRouter();

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

  return (
    <div className={adminStyles.dashboardContainer}>
      <div className={adminStyles.contentContainer}>
        <Image src={adminImage} alt="Next Pisher" className={adminStyles.image} />
        <h2 className={adminStyles.title}>Admin Dashboard</h2>
        {webSitesInProject !== null && webSitesInProject !== undefined ? (
          webSitesInProject.length > 0 ? (
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
                <Button variant="contained" color="success" style={{ margin: "1%" }}>
                  <Link href="/admin/decoy">Decoy Controller</Link>
                </Button>
                <Button variant="contained" color="success" style={{ margin: "1%" }}>
                  <Link href="/admin/userData">User Data</Link>
                </Button>
                <Button
                  onClick={logout}
                  variant="contained"
                  color="success"
                  style={{ margin: "1%" }}
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <p>No projects available</p>
          )
        ) : (
          <div className={adminStyles.contentRow}>
            <p>Loading or Not Signed In</p>
            <Button variant="contained" color="success">
              <Link href="/">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );

};


