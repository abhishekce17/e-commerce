"use client"
import {Inter} from 'next/font/google'
import style from "@/Styles/Account.module.css"
import AccountSidebar from '@/Components/AccountSidebar'
import UserAuthContext from '../contextProvider';
import {useContext} from 'react';
import {useRouter} from 'next/navigation';

const inter = Inter({subsets: ['latin']})

export default function AccountLayout({children}) {
    const router = useRouter();
    const context = useContext(UserAuthContext);
    return (
        <>
            {context.isUserLoggedIn ?
                <div className={style.checkout_page} >
                    {children}
                </div>
                : router.push("/authentication/sign-in?callbackUrl=/place-your-order/order-summary")
            }</>
    )
}
