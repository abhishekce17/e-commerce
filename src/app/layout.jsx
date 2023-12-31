"use client"
import Navbar from '@/Components/Navbar'
import './globals.css'
import {Inter} from 'next/font/google'
import Footer from '@/Components/Footer'
import {usePathname} from 'next/navigation'
import UserAuthContext from './contextProvider'
import {useEffect, useState} from 'react'
import Loading from './administrator/admin/loading'
import toast, {Toaster} from 'react-hot-toast';
import {notify} from '@/JS/notify'


const inter = Inter({subsets: ['latin']})
// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
// export const dynamic = 'force-dynamic'
export default function RootLayout({children}) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [categories, setCategories] = useState([]);
  const [buyingProduct, setBuyingProduct] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({});


  let pathname = usePathname();

  const fetchUserData = async () => {
    const infoResponse = await fetch("/api/UserInformation/usersInfo")
    const infoResult = await infoResponse.json()
    if (infoResult.status === 200) {
      setUserData(infoResult.userData);
      console.log(infoResult.userData);
      setIsLoading(false)
    } else if (infoResult.status === 401) {
      setIsLoading(false)
    }
  }

  const addToCart = async (productId, variant) => {
    try {

      const fetchResponse = await fetch("/api/UserInformation/UserCartInfo/AddToCart", {
        method: "POST",
        body: JSON.stringify({productId, variant})
      })
      const responseResult = await fetchResponse.json();
      if (responseResult.status === 200) {
        setUserData({...userData, Cart: [...userData.Cart, {productId, variant}]})
        notify("Product is added to the Cart", "success");
      } else if (responseResult.status === 401) {
        toast.error('Please sign in to add product in your cart',
          {
            duration: 2500,
            iconTheme: {
              primary: '#013d29',
              secondary: '#fff',
            }
          });
        // let cart = JSON.parse(localStorage.getItem("cart")) || [];
        // localStorage.setItem("cart", (cart !== null) ? JSON.stringify([...cart, { productId, variant }]) : JSON.stringify([{ productId, variant }]))
      }
    } catch (error) {
      toast.error("Server is not responding for your Cart information")
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
    validateUserSession();
  }, [isUserLoggedIn, refresh])


  return (
    <html lang="en">
      <UserAuthContext.Provider
        value={{
          isUserLoggedIn,
          setIsUserLoggedIn,
          userData,
          fetchUserData,
          setUserData,
          addToCart,
          refresh,
          setRefresh,
          categories,
          setCategories,
          buyingProduct,
          setBuyingProduct,
          paymentInfo,
          setPaymentInfo
        }}  >
        <body className={inter.className}>
          {
            isLoading ? Loading() :
              <>
                {!pathname.includes("authentication") && !pathname.includes("administrator") && <Navbar />}
                <div style={{flexGrow: 1}} >
                  <Toaster />
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
