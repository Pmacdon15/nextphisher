'use client';
import { useRouter } from "next/navigation";
import adminStyles from "@/app/components/userDataDisplay/userDataDisplay.module.css";
import Button from "@mui/material/Button";
export default function ClientComponent({children}) {
  const router = useRouter();
  return (
    <div>
      <h2 className={adminStyles.title}>User Data</h2>
      {children}
      <div className={adminStyles.dataColumn}>
          <Button variant="contained" color="success" onClick={() => router.push("/admin")}>
            Back
          </Button>
        </div>
    </div>
  );
}