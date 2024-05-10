//@/components/adminDashboard/clientButtonToQrCode.jsx
'use client';
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";


export default function ClientButtonToQrCode({siteName }) {
  // try{  
  const router = useRouter();
  // }catch(error){
  //   console.error("Error with router, error: ", error);
  // }
  // console.log("siteName: ", siteName);
    return (   
      <div>     
        <Button  onClick={() => router.push(`/admin/QrCode/${siteName}`)}variant="contained" color="success">
        Qr Code
      </Button>
      </div>
       
    );
}

// onClick={() => router.push(`/admin/QrCode/${siteName}`)