import { Inter } from 'next/font/google'
import style from "@/Styles/Account.module.css"
import AccountSidebar from '@/Components/AccountSidebar'

const inter = Inter({ subsets: ['latin'] })

export default function AccountLayout({ children }) {
    return (
        <div className={style.checkout_page} >
            {children}
        </div>
    )
}
