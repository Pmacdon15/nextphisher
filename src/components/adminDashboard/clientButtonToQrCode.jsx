'use client';
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { logout } from "@/actions/logout.jsx";

export default function ClientButtonToQrCode({ siteName }) {
    const router = useRouter();
    return (        
        <Button onClick={() => logout()} variant="contained" color="success">
        Qr Code
      </Button>
       
    );
}

// onClick={() => router.push(`/admin/QrCode/${siteName}`)