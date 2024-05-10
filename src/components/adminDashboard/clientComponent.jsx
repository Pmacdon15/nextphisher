'use client';
import { useRouter } from "next/navigation";
import adminStyles from "@/app/admin/adminStyles.module.css";
import Button from "@mui/material/Button";
import { logout } from "@/actions/logout.jsx";

export default function ClientComponent({ children }) {
    const router = useRouter();
    return (
        <div>
            <h2 className={adminStyles.title}>Admin Dashboard</h2>
            {children}
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
    )
}



