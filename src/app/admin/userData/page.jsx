import adminStyles from "../adminStyles.module.css";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation';


import UserDataDisplay from "./UserDataDisplay/component.jsx";

const AdminDashboard = () => {
  return (
    <div>
      <h2 className={adminStyles.title}>User Data</h2>
      <UserDataDisplay></UserDataDisplay>
    </div>
  );

};
export default AdminDashboard;



// useEffect(() => {
//   try {
//     const fetchData = async () => {
//       const response = await fetch("/api/admin/auth");
//       const data = await response.json();
//       if (data.message === "Authorized") {
//         setUserAuth(true);
//       }
//     };
//     fetchData();
//   } catch (error) {
//     console.error("Error reading file", error);
//   }
// }, []);

// useEffect(() => {
//   try {
//     const fetchData = async () => {
//       const response = await fetch("/api/admin/userData");
//       const data = await response.json();
//       setDataSet(data.data);
//     };
//     fetchData();
//   } catch (error) {
//     console.error("Error reading file", error);
//   }
// }, []);

// console.log(dataSet);

// let firstHalf = [];
// let secondHalf = [];

// if (dataSet) {
//   const halfIndex = Math.ceil(dataSet.length / 2);
//   firstHalf = dataSet.slice(0, halfIndex);
//   secondHalf = dataSet.slice(halfIndex);
// }
// dataSet && dataSet.length >0 ?




//   {userAuth ? (
//     <>
//       {dataSet.length > 0 ? (
//         <div className={adminStyles.contentRow}>
//           <div className={adminStyles.dataColumn}>
//             {firstHalf.map((data, index) => (
//               <div key={index} className={adminStyles.data}>
//                 <p className={adminStyles.par}>User Name: {data.username}</p>
//                 <p className={adminStyles.par}>Password: {data.password}</p>
//                 <p className={adminStyles.par}>Service: {data.service}</p>
//                 <p className={adminStyles.par}>IP Address: {data.ipv4}</p>
//                 <p className={adminStyles.par}>Date: {data.date.split("T")[0]}</p>
//                 <p className={adminStyles.par}>Time: {data.date.split("T")[1].split(".")[0]}</p>
//               </div>
//             ))}
//           </div>
//           {secondHalf.length > 0 && (
//             <div className={adminStyles.dataColumn}>
//               {secondHalf.map((data, index) => (
//                 <div key={index} className={adminStyles.data}>
//                   <p className={adminStyles.par}>User Name: {data.username}</p>
//                   <p className={adminStyles.par}>Password: {data.password}</p>
//                   <p className={adminStyles.par}>Service: {data.service}</p>
//                   <p className={adminStyles.par}>Date: {data.date.split("T")[0]}</p>
//                   <p className={adminStyles.par}>Time: {data.date.split("T")[1].split(".")[0]}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>No data</p>
//       )}
//       <div className={adminStyles.contentRow}>
//         <Button variant="contained" color="success" onClick={() => router.push("/admin")}>
//           Back
//         </Button>
//       </div>
//     </>
//   ) : (
//     <p>Unauthorized</p>
//   )}
// </div>