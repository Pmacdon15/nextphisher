'use Server';
import Image from 'next/image';
import qrCodeStyles from '@/components/QrCode/QrCode.module.css';
import { getBackendIp, siteImageExists, saveSiteImage } from '@/actions/actions';
import { redirect } from 'next/navigation';
import { auth } from "@/actions/actions";

export async function QrCodeImage(siteName) {

  async function generateQrCode() {

    if (! await auth()) redirect("/");

    if (!siteImageExists(siteName)) {
      const backendIp = await getBackendIp();
      const url = "http://" + backendIp + ":3000/" + siteName.siteName
      //console.log("Url: ", url);

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

        const buffer = await data.arrayBuffer();
        saveSiteImage(siteName.siteName, Buffer.from(buffer));
        return true;

      } catch (error) {
        console.error("Error getting Qr Code, error: ", error);
        return false
      }
    }else {
      return true;
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
