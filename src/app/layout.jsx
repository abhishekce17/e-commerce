"use client"
import Navbar from '@/Components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/Components/Footer'
import { usePathname } from 'next/navigation'
import UserAuthContext from './contextProvider'
import { useEffect, useState } from 'react'
import Loading from './administrator/admin/loading'


const inter = Inter({ subsets: ['latin'] })
// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
export const dynamic = 'force-dynamic'
export default function RootLayout({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({})

  let pathname = usePathname()

  const fetchUserData = async () => {
    const infoResponse = await fetch("/api/UserInformation/usersInfo")
    const infoResult = await infoResponse.json()
    if (infoResult.status === 200) {
      setUserData(infoResult.userData)
      setIsLoading(false)
    } else if (infoResult.status === 401) {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    const validateUserSession = async () => {
      const sessionResponse = await fetch("/api/Authentication/ValidateSession")
      const sessionResult = await sessionResponse.json()
      if (sessionResult.status === 200) {
        setIsUserLoggedIn(true);
        fetchUserData()
      } else if (sessionResult.status === 401) {
        setIsLoading(false)
      }
    }
    validateUserSession()
  }, [])


  return (
    <html lang="en">
      <UserAuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, userData, fetchUserData, setUserData }}  >
        <body className={inter.className}>
          {
            isLoading ? Loading() :
              <>
                {!pathname.includes("authentication") && !pathname.includes("administrator") && <Navbar />}
                <div style={{ flexGrow: 1 }} >
                  {children}
                </div>
                {!pathname.includes("authentication") && !pathname.includes("administrator") && <Footer />}
              </>
          }
        </body>
      </UserAuthContext.Provider>
    </html>
  )
}
