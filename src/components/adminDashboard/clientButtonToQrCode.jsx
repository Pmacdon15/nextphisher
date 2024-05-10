//@/components/adminDashboard/clientButtonToQrCode.jsx
'use client';
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
// import { redirect } from "next/navigation";


export default function ClientButtonToQrCode({ siteName }) {
  // try{  
  const router = useRouter();
  // }catch(error){
  //   console.error("Error with router, error: ", error);
  // }
    return (        
        <Button  onClick={() => router.push(`/admin/QrCode/${siteName}`)}variant="contained" color="success">
        Qr Code
      </Button>
       
    );
}

// onClick={() => router.push(`/admin/QrCode/${siteName}`)