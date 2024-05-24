// @/app/admin/page.jsx
'use server';
import ServerComponent from "@/components/adminDashboard/serverComponent.jsx";
import ClientComponent from "@/components/adminDashboard/clientComponent.jsx";

const AdminDashboard = async () => {  
  
  return (
    <div>
      <ClientComponent>
        <ServerComponent/>     
      </ClientComponent>
    </div>
  );

};
export default AdminDashboard;





