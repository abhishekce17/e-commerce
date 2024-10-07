"use client"
import { usePathname } from "next/navigation"
import { OutlineButton } from "./OutlineButton"

const AccountSidebar = () => {

  const pathname = usePathname()
  const choosenRoute = pathname.split("/").reverse()[0];
  const features = ["Account", "Order History", "Wishlist", "Payment Methods", "Privacy and Policy"]


  const signOut = async () => {
    const signOutResponse = await fetch("/api/Authentication/userAuth/SignOut", { method: "DELETE" })
    const result = await signOutResponse.json()
    if (result.status === 200) {
      window.location.href = "/";
    }
  }

  return (
    <ul className="list-none flex flex-col gap-3 max-w-max min-w-max" >
      {
        features.map((feature, index) => {
          return (
            <li key={index} >
              <OutlineButton label={feature} href={index === 0 ? "/account/" : "/account/" + feature.toLowerCase().replace(/ /g, "-")} className={`hover:bg-primary-light rounded-md w-full block ${feature.toLowerCase().replace(/ /g, "-") === choosenRoute ? "bg-primary text-white" : "bg-white"}`} />
            </li>
          )
        })
      }
      <li >
        <OutlineButton onClick={signOut} label="Sign Out" className=" rounded-md bg-primary-light text-white w-full hover:bg-primary" />
      </li>
    </ul>

  )
}

export default AccountSidebar