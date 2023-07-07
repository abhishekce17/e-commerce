import { Inter } from 'next/font/google'
import style from "@/Styles/Account.module.css"
import AccountSidebar from '@/Components/AccountSidebar'

const inter = Inter({ subsets: ['latin'] })

export default function AccountLayout({ children }) {
    return (

        <div className={style.account_container} >
        <div className={style.sidebar_container} >
          <AccountSidebar />
        </div>
        <div className={style.account_page_features} >
            {children}
        </div>
      </div>

    )
}
