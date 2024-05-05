"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import adminStyles from "../../adminStyles.module.css";
import adminImage from "../../../../../public/admin.png";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function QrCode({ params }) {
  const webSiteZToShowQrCodeFor = params.projectName;
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let url = "";
      try {
        const serverIp = await fetch("/api/admin/getIp");
        const ip = await serverIp.json();
        console.log(ip);
        if (ip.message === "Unauthorized") {
          throw new Error("Unauthorized");
        }

        url = "http://" + ip.ip + ":3000/" + webSiteZToShowQrCodeFor;

      } catch (error) {
        console.error("Error getting server IP address");
      }

      try {
        const response = await fetch(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`,
          {
            cors: "no-cors",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch QR code");
        }
        const data = await response.blob();
        const imageUrl = URL.createObjectURL(data);
        setQrCodeUrl(imageUrl);
      } catch (error) {
        console.error("Error getting Qr Code");
      }
    };

    fetchData();
  }, [webSiteZToShowQrCodeFor]); // Include webSiteZToShowQrCodeFor in the dependency array

  console.log(qrCodeUrl);

  return (
    <div className={adminStyles.dashboardContainer}>
      <div className={adminStyles.contentContainer}>
        <Image
          src={adminImage}
          // width={300}
          alt="Next Pisher"
          className={adminStyles.image}
        />
        <h2 className={adminStyles.title}>Qr Code Link</h2>
        {qrCodeUrl ? (
          <div className={adminStyles.contentRow}>
            <Image
              width={250}
              height={250}
              src={qrCodeUrl}
              alt="QR Code"
              className={adminStyles.image}
            />{" "}
          </div>
        ) : (
          <p>Loading or Not Signed In</p>
        )}
        <div className={adminStyles.contentRow}>
          <Button variant="contained" color="success">
            <Link href="/admin/">Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}