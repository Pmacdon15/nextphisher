"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";



export async function GET(req) {
  try {
    const token = cookies().get("AuthCookieTracking");
    const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);
    if (decoded.username !== "admin") {
      return Response.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error Unauthorized");
    return Response.json({ message: "Unauthorized" });
  }
  let ServerIp;
 try{
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    console.log("Server Ip: "+data.ip);
    ServerIp = data.ip;
  }catch(error){
    console.error("Error getting server IP address");
 }
  return Response.json({ ip: ServerIp });
}
