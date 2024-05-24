'use server';
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'

export async function login(data) {
  let result = false;
  try {    
    if (data.username === "admin" && data.password === process.env.SECRET_ADMIN_PASSWORD) {
      console.log('data.username: ', data.username) 
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

      result = true;
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error("Error: ", error.message);   
    console.log(result)
  }
  console.log(result)
  if (result) {
    redirect("/admin");
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
  } catch (error) {
    console.error("Error appending to file:", error.message);
    return false;
  }
}

export async function auth() {
  let Authed = false;
  const token = cookies().get("AuthCookieTracking");  
  try {    
    if (!token) throw new Error("No token found");

    const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);
    
    if (!decoded.username === "admin") throw new Error("Unauthorized");

    Authed = true;

  } catch (error) {
    console.error(error.message);   
  }
  if (!Authed) {
    redirect("/")
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
  try {
    const siteImageFilePath = path.join(process.cwd(), 'public/qrCodes', `${siteName}.png`);
    const exists = fs.existsSync(siteImageFilePath);
    console.log("Site image path: ", siteImageFilePath);
    console.log("Site image exists: ", exists ? true : false);
    return exists ? true : false;
  } catch (error) {
    console.error("Error checking site image: ", error);
    return false;
  }
}

export async function saveSiteImage(siteName, siteImage) {
  try {
    const siteImageFilePath = path.join(process.cwd(), 'public/qrCodes', `${siteName}.png`);
    console.log("Saving site image: ", siteImageFilePath);
    fs.writeFileSync(siteImageFilePath, siteImage);
    console.log("Site image saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving site image: ", error);
    return false;
  }
}