'use Server';
// import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import Image from 'next/image';
import qrCodeStyles from '@/components/QrCode/QrCode.module.css';
import { getBackendIp, siteImageExists, saveSiteImage } from '@/actions/actions';


export async function QrCodeImage(siteName) {

  async function generateQrCode() {

    // Todo: make an auth action to check if the user is admin
    try {
      const token = cookies().get("AuthCookieTracking");
      const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);

      if (!decoded.username === "admin") {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error("Error No .env file or cookie not set! Error: ", error);
      return { message: "Unauthorized", data: [] };
    }

    if (siteImageExists(siteName)) {
      const backendIp = await getBackendIp();
      const url = "http://" + backendIp + ":3000/" + siteName.siteName
      console.log("Url: ", url);

      try {
        const response = await fetch(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`,
          {
            cors: "no-cors",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch QR code");
        }

        const data = await response.blob();
        console.log("Data: ", data);
        const buffer = await data.arrayBuffer();
        if (saveSiteImage(siteName.siteName, Buffer.from(buffer))) {
          return true;
        } else {
          return false;
        }

      } catch (error) {
        console.error("Error getting Qr Code, error: ", error);
        return false
      }
    }
  }

  const QrCodeValid = await generateQrCode();

  return (
    QrCodeValid ? (
      <div>
        <Image
          width={250}
          height={250}
          src={`/qrCodes/${siteName.siteName}.png`}
          alt="QR Code"
          className={qrCodeStyles.image}
        />
      </div>
    ) : (
      <div>Loading....</div>
    )
  )

}




export default QrCodeImage;
