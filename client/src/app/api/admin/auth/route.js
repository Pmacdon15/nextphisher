"use server";

const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Get Json data from the data directory
    // user should  = { id: 69, username: "admin" };
    const token = cookies().get("AuthCookieTracking");
    const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);
    //console.log(decoded);
    //console.log(decoded.username);
    if (!decoded.username === "admin") {
      return Response.json({ message: "Unauthorized" });
    }
    return Response.json({ message: "Authorized", userData: decoded });
  } catch (error) {
    console.error("Error No .env file or cookie not set!");
    return Response.json({ message: "Unauthorized" });
  }
}
