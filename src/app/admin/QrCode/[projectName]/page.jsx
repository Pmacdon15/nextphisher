'use server';
import ClientComponent from "@/components/QrCode/clientComponent.jsx";
import ServerComponent from "@/components/QrCode/serverComponent.jsx";
export default async function QrCodePage({params}) {
  const siteName = params.projectName;
  return (    
    <ClientComponent><ServerComponent siteName = {siteName}/></ClientComponent>    
  );
}


// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import adminStyles from "../../adminStyles.module.css";
// import adminImage from "../../../../../public/admin.png";
// import Button from "@mui/material/Button";
// import Link from "next/link";

// export default function QrCode({ params }) {
//   const webSiteZToShowQrCodeFor = params.projectName;
//   const [qrCodeUrl, setQrCodeUrl] = useState("");
//   const [userAuth, setUserAuth] = useState(false);

//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const response = await fetch("/api/admin/auth");
//         const data = await response.json();
//         if (data.message === "Authorized") {
//           setUserAuth(true);
//         }
//       };
//       fetchData();
//     } catch (error) {
//       console.error("Error reading file", error);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       let url = "";
//       try {
//         const serverIp = await fetch("/api/admin/getIp");
//         const ip = await serverIp.json();
//         console.log(ip);
//         if (ip.message === "Unauthorized") {
//           throw new Error("Unauthorized");
//         }

//         url = "http://" + ip.ip + ":3000/" + webSiteZToShowQrCodeFor;

//       } catch (error) {
//         console.error("Error getting server IP address error: ", error);
//       }

//       try {
//         const response = await fetch(
//           `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`,
//           {
//             cors: "no-cors",
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch QR code");
//         }
//         const data = await response.blob();
//         const imageUrl = URL.createObjectURL(data);
//         setQrCodeUrl(imageUrl);
//       } catch (error) {
//         console.error("Error getting Qr Code");
//       }
//     };

//     fetchData();
//   }, [webSiteZToShowQrCodeFor]); // Include webSiteZToShowQrCodeFor in the dependency array

//   console.log(qrCodeUrl);

//   return (
//     <div>
//         <h2 className={adminStyles.title}>Qr Code Link</h2>
//         {qrCodeUrl ? (
//           <div className={adminStyles.contentRow}>
//             <Image
//               width={250}
//               height={250}
//               src={qrCodeUrl}
//               alt="QR Code"
//               className={adminStyles.image}
//             />{" "}
//           </div>
//         ) : (
//           userAuth? (
//             <p>QR Code loading....</p>
//           ) : (
//             <p>Unauthorized</p>
//           )
//         )}
//         <div className={adminStyles.contentRow}>
//           <Button variant="contained" color="success">
//             <Link href="/admin/">Back</Link>
//           </Button>
//         </div>
//       </div>
    
//   );
// }
