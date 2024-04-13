"use server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("AuthCookieTracking");
  return Response.json({ message: "Logged Out" });
}
