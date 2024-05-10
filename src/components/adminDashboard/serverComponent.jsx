//@/components/adminDashboard/serverComponent.jsx
'use server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

import adminStyles from "@/components/adminDashboard/adminDashboard.module.css";

import ClientButtonToQrCode from '@/components/adminDashboard/clientButtonToQrCode.jsx';



export default async function  serverComponent  ({ router,children}) {
    async function getWebSites() {
        try {
            const token = cookies().get("AuthCookieTracking");
            const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);

            if (!decoded.username === "admin") {
                return { message: "Unauthorized", data: [] };
            }
        } catch (error) {
            console.error("Error No .env file or cookie not set! error: ", error);
            return { message: "Unauthorized", data: [] };
        }

        let data = [];
        try {
            const filePath = path.join(process.cwd(), "data", "config.json");

            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, "utf8").trim();
                if (fileContent) {
                    data = JSON.parse(fileContent);
                }
            }
        } catch (error) {
            console.error("Error reading  error: ", error);
            return { message: "Error reading file" };
        }
        return { message: "success", data };
    }

    const { data: dataSet } = await getWebSites();
    revalidatePath('@/app/admin/serverComponent.jsx')

    return (
        <div className={adminStyles.dataColumn}>
            {dataSet.length > 0 ? (
                dataSet.map((data) => (
                    <div key={data.name} className={adminStyles.data}>
                        <p className={adminStyles.par}>
                            Project Name: {data.name}
                        </p>
                        {/* <ClientButtonToQrCode key={data.name} siteName={data.name} /> */}
                        {/* {children} */}
                    </div>
                ))
            ) : (
                <p>No data</p>
            )}
        </div>
    );
}

// export default serverComponent;