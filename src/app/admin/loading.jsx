'use client';
import adminStyles from "./adminStyles.module.css";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation';

export default function Loading() {
    const router = useRouter();
    return (
        <div className={adminStyles.contentRow}>
            <p>Loading or not Signed In</p>
            <Button variant="contained"  onClick={() => router.push("/")} color="success">
               Login
            </Button>
        </div>
    );
}