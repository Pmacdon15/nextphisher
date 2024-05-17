'use server';
import ClientComponent from "@/components/QrCode/clientComponent.jsx";
import ServerComponent from "@/components/QrCode/serverComponent.jsx";
import {auth} from "@/actions/actions.jsx"
export default async function QrCodePage({params}) {
  const siteName = params.projectName;
  await auth();
  return (    
    <ClientComponent><ServerComponent siteName = {siteName}/></ClientComponent>    
  );
}