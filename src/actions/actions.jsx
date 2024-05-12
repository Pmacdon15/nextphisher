'use server';
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'

export async function login(data) {
  try {
    console.log("Data: ", data);
    console.log(data.username);
    console.log(data.password);
    console.log(process.env.SECRET_ADMIN_PASSWORD);
    if (data.username === "admin" && data.password === process.env.SECRET_ADMIN_PASSWORD) {
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

      return true;
    }
  } catch (error) {
    console.error("Error No .env file or cookie not set!, Error: ", error.message);
    return false;
  }
}

export async function clientLogin(data) {
  try {
    let jsonArray = [];
    const filePath = path.join(process.cwd(), "data", "userData.json");
    // console.log("Appending user data:", data);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8").trim();
      if (fileContent) {
        jsonArray = JSON.parse(fileContent);
      }
    }

    jsonArray.push(data);

    fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2));
    console.log("User data appended to file");
    return true;
  }catch (error) {
    console.error("Error appending to file:", error.message);
    return false;
  }
}

export async function auth() {
  try {
    const token = cookies().get("AuthCookieTracking");
    if (!token) throw new Error("No token found");

    const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);

    if (!decoded.username === "admin") throw new Error("Unauthorized");

    return true;

  } catch (error) {
    console.error(error.message);
    return false;
  }
}

export async function logout() {
  try {
    cookies().delete("AuthCookieTracking");
  } catch (error) {
    console.error("Error logging out: ", error);
  }
  redirect("/");
}

export async function getWebSites() {
  try {
    const filePath = path.join(process.cwd(), "data", "config.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8").trim();
      if (fileContent) {
        return JSON.parse(fileContent);
      }
    }
  } catch (error) {
    console.error("Error reading  error: ", error.message);
    return false;
  }
}

export async function getBackendIp() {
  let ServerIp;
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    console.log("Server Ip: " + data.ip);
    ServerIp = data.ip;
  } catch (error) {
    console.error("Error getting server IP address");
  }
  return ServerIp;
}

export async function siteImageExists(siteName) {
  const siteImageFilePath = path.join(process.cwd(), `public/qrCodes/${siteName}.png`);
  const siteImageExists = fs.existsSync(siteImageFilePath);
  return siteImageExists ? 'siteImage' : null;
}

export async function saveSiteImage(siteName, siteImage) {
  const siteImageFilePath = path.join(process.cwd(), `public/qrCodes/${siteName}.png`);
  try {
    fs.writeFileSync(siteImageFilePath, siteImage);
    return true;
  } catch (error) {
    console.error("Error saving site image: ", error);
    return false;
  }
}
