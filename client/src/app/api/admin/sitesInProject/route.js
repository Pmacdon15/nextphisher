"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const token = cookies().get("AuthCookieTracking");
    const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);
    if (decoded.username !== "admin") {
      return Response.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error No .env file or cookie not set!");
    return Response.json({ message: "Unauthorized" });
  }
  try {
    let data = [];
    const filePath = path.join(process.cwd(), "data", "config.json");

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8").trim();
      if (fileContent) {
        data = JSON.parse(fileContent);
        console.log(data);
        return Response.json({ data });
      }
    }
  } catch (error) {
    console.error("Error reading file", error);
    return Response.json({ message: "Error reading file" });
  }

  return Response.json({ message: "No data found" });
}
