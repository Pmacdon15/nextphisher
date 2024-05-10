'use server';
import { revalidatePath } from "next/cache";

const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import adminStyles from "@/app/admin/adminStyles.module.css";
// import adminStyles from "@/components/userDataDisplay/userDataDisplay.module.css";
import ClientButtonToQrCode from '@/components/adminDashboard/clientButtonToQrCode.jsx';

const serverComponent = async () => {
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
                        <ClientButtonToQrCode siteName={data.name} />
                    </div>
                ))
            ) : (
                <p>No data</p>
            )}
        </div>
    );
}

export default serverComponent;