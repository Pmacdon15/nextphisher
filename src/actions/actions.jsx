'use server';
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import path from 'path'
import fs from 'fs'

export async function logout() {
  try {
    cookies().delete("AuthCookieTracking");
  } catch (error) {
    console.error("Error logging out: ", error);
  }
  redirect("/");
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
