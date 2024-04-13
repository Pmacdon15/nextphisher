"use server";
import fs from "fs";
import path from "path";

const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Get Json data from the data directory
    //const user = { id: 69, username: "admin" };
    const token = cookies().get("AuthCookieTracking");
    const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);
    //console.log(decoded);
    //console.log(decoded.username);
    if (!decoded.username === "admin") {
      return Response.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error No .env file or cookie not set!");
    return Response.json({ message: "Unauthorized" });
  }
  
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
    console.error("Error reading file");
    return Response.json({ message: "Error reading file" });
  }
  return Response.json({ data });
}

