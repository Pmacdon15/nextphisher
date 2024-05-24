'use server';
import ClientComponent from "@/app/components/QrCode/clientComponent.jsx";
import ServerComponent from "@/app/components/QrCode/serverComponent.jsx";
export default async function QrCodePage({params}) {
  const siteName = params.projectName;
  return (    
    <ClientComponent><ServerComponent siteName = {siteName}/></ClientComponent>    
  );
}