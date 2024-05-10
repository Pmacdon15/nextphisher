import adminStyles from "@/app/admin/adminStyles.module.css"; 
export default function ClientComponent({children}) {
  return (
    <div>
      <h2 className={adminStyles.title}>User Data</h2>
      {children}
    </div>
  );
}