
import Image from "next/image";
import adminImage from "../../../public/admin.png";
import adminStyles from "./adminStyles.module.css";
import { Suspense } from "react";
import Loading from "./loading";
import { auth } from "@/app/actions/actions.jsx";

export default async function Layout({ children }) {
  await auth();
  return (
    <Suspense fallback={<Loading />}>
      <div className={adminStyles.dashboardContainer}>
        <div className={adminStyles.contentContainer}>
          <Image src={adminImage} alt="Next Phisher" className={adminStyles.image} />
          {children}
        </div>
      </div>
    </Suspense>
  );

};


