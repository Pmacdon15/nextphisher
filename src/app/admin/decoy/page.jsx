'use server';
import ClientComponent from "@/components/adminDecoy/clientComponent";
import {auth} from "@/actions/actions.jsx";

export default async function Home() {
  await auth();   
  
  return (
    <ClientComponent/>
  );
}




