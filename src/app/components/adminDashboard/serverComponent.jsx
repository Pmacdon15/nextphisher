//@/components/adminDashboard/serverComponent.jsx
'use server';
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import adminStyles from "@/app/components/adminDashboard/adminDashboard.module.css";
import ClientButtonToQrCode from '@/app/components/adminDashboard/clientButtonToQrCode.jsx';


export default async function serverComponent() {
    async function getWebSites() {    

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

    const { data: dataSet, message: message } = await getWebSites();
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

// export default serverComponent;