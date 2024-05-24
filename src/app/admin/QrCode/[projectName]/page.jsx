'use server';
import ClientComponent from "@/components/QrCode/clientComponent.jsx";
import ServerComponent from "@/components/QrCode/serverComponent.jsx";
export default async function QrCodePage({params}) {
  const siteName = params.projectName;
  return (    
    <ClientComponent><ServerComponent siteName = {siteName}/></ClientComponent>    
  );
}