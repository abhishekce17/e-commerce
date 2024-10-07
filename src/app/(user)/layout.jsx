import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import { Toaster } from 'react-hot-toast'
import { headers } from 'next/headers'
import { fetchUserDetails } from '@/actions/fetchUserDetails';
import ClientComponentWrapper from '@/Components/ClientComponentWrapper';
import { notify } from '@/utils/notify';
// import ClientWrapper from './ClientWrapper'

export default async function SubPageLayout({ children }) {
    const { status, error, userData } = await fetchUserDetails();

    if (status === 500) {
        notify(error, "error");
    }

    const headersList = headers()
    const pathname = headersList.get("x-pathname");
    if (pathname?.includes("sign-in") || pathname?.includes("sign-up")) {
        return children
    }

    return (
        <>
            <Navbar />
            <div style={{ flexGrow: 1 }}>
                <ClientComponentWrapper userData={userData} >
                    <Toaster />
                    <main>{children}</main>
                </ClientComponentWrapper>
            </div>
            <Footer />
        </>
    )
}