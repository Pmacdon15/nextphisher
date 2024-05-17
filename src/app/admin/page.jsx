// @/app/admin/page.jsx
'use server';
import ServerComponent from "@/components/adminDashboard/serverComponent.jsx";
import ClientComponent from "@/components/adminDashboard/clientComponent.jsx";
import {auth} from "@/actions/actions.jsx";
const AdminDashboard = async () => {
  await auth();
  return (
    <div>
      <ClientComponent>
        <ServerComponent/>     
      </ClientComponent>

    </div>
  );

};
export default AdminDashboard;





