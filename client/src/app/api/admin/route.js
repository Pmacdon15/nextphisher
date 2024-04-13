'use server'

import {cookies} from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const jsonData = await req.json();
    if (jsonData.service === "admin") {
      if (jsonData.username === "admin" && jsonData.password === process.env.SECRET_ADMIN_PASSWORD) {
        try {
          const user = { id: 69, username: "admin" };
          const token = jwt.sign(user, process.env.SECRET_KEY_JWT, {
            expiresIn: "1h",
          });
  
          cookies().set({
            name: "AuthCookieTracking",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 1000,
            sameSite: "Strict",
          });
        } catch (error) {
          console.error("Error No .env file or cookie not set!");
        }
        return Response.json({ message: "Authorized" });
        //return Response.json({ message: "Authorized", token });
        //return Response.cookie("token", token, { httpOnly: true, secure: true, sameSite: "None" });
      } else return Response.json({ message: "Unauthorized" }); // Return Unauthorized if username and password are not admin
    } else return Response.json({ message: "Unauthorized" });
  }
  