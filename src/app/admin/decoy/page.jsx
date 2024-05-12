'use server';
import ClientComponent from "@/components/adminDecoy/clientComponent";
import {auth} from "@/actions/actions.jsx";
import { redirect } from "next/navigation";

export default async function Home() {
  if (! await auth()) {
   console.log("Unauthorized");
    redirect("/");
  }
  
  return (
    <ClientComponent/>
  );
}




