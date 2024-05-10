'use server';
import ClientButtonToQrCode from '@/components/adminDashboard/ClientButtonToQrCode.jsx';

const Test = async () => {
    return (
        <div>
            <ClientButtonToQrCode siteName={"decoy"}/>
        </div>
    );

};
export default Test;
