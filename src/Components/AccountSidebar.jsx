"use client"
import style from "@/Styles/Account.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const AccountSidebar = () => {
  let pathname = usePathname()
  let choosenRoute = pathname.split("/")[2]
  let features = ["Your Account", "Order History", "Wishlist", "Payment Methods", "Account Setting", "Help and Support", "Privacy and Policy"]

  useEffect(()=>{
    const options = document.querySelectorAll('li > a');
    options.forEach(option => {
      option.setAttribute('data-choosed', 'false');
    });
  }, [pathname])
  // const [dataDefault, setDefaultdata] = useState("false")
  function handleSelection(e) {
    const selectedElement = e.target;
    const optionsContainer = selectedElement.parentNode.parentNode;

    const options = optionsContainer.querySelectorAll('li > a');
    options.forEach(option => {
      option.setAttribute('data-choosed', 'false');
      option.setAttribute('data-default', 'false');
    });

    selectedElement.setAttribute('data-choosed', 'true');
  }

  return (
    <ul className={style.sidebar} >

      {
        features.map((feature, index) => {
          return (
            <li  key={index} >
              <Link href={"/account/"+feature.toLowerCase().replace(/ /g, "-")}  data-choosed="false" data-default= {feature.toLowerCase().replace(/ /g, "-") === choosenRoute && "true"} onClick={handleSelection} >{feature}</Link>
            </li>
          )
        })
      }
    </ul>

  )
}

export default AccountSidebar