//@/components/adminDashboard/clientComponent.jsx
'use client';
import { useRouter } from "next/navigation";
import adminStyles from "@/app/components/adminDashboard/adminDashboard.module.css";
import Button from "@mui/material/Button";
import { logout } from "@/app/actions/actions.jsx";
// import ClientButtonToQrCode from '@/components/adminDashboard/clientButtonToQrCode.jsx';

export default function ClientComponent({ children }) {
    const router = useRouter();
    return (
        <div>
            <h2 className={adminStyles.title}>Admin Dashboard</h2>
            {children}
            <div >
                <Button className={adminStyles.button} variant="contained" onClick={() => router.push("/admin/decoy")} color="success" style={{ margin: "1%" }}>
                    Decoy Controller
                </Button>
                <Button className={adminStyles.button} variant="contained" onClick={() => router.push("/admin/userData")} color="success" style={{ margin: "1%" }}>
                    User Data
                </Button>
            </div>
            <div className={adminStyles.dashboardColumn}>
                <Button onClick={() => logout()} variant="contained" color="success" style={{ margin: "1%" }}>
                    Logout
                </Button>
            </div>
        </div>
    )
}



