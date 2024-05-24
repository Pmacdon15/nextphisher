'use client';
import QrCodeStyles from "@/app/components/QrCode/QrCode.module.css";
import Button from "@mui/material/Button";
import { useRouter} from "next/navigation";

export default function ClientComponent({children}) {
    const router = useRouter();
    return (
    <div>
        <h2 className={QrCodeStyles.title}>Qr Code Link</h2>
        {children}
        <div className={QrCodeStyles.dataColumn}>
          <Button  onClick={() => router.push(`/admin`)} variant="contained" color="success">
            Back
          </Button>
        </div>
      </div>
    
  );
}