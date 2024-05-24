'use Server';
import Image from 'next/image';
import qrCodeStyles from '@/app/components/QrCode/QrCode.module.css';
import { getBackendIp, siteImageExists, saveSiteImage } from '@/actions/actions';


export async function QrCodeImage(siteName) {

  async function generateQrCode() {

    if (!await siteImageExists(siteName.siteName)) {
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
        const buffer = Buffer.from(await data.arrayBuffer());
        if (saveSiteImage(siteName.siteName, buffer)) {
          console.log("Image saved successfully");
          return true;
        }
        throw new Error("Error saving image");

      } catch (error) {
        console.error("Error getting Qr Code, error: ", error);
        return false
      }
    } else {
      console.log("Image already exists");
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
