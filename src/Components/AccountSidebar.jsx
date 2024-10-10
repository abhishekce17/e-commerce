"use client"
import { usePathname, useRouter } from "next/navigation"
import { OutlineButton } from "./OutlineButton"
import { userLogOut } from "@/actions/userLogOut"
import { notify } from "@/utils/notify"

const AccountSidebar = () => {
  const pathname = usePathname()
  const choosenRoute = pathname.split("/").reverse()[0];
  const features = ["Account", "Order History", "Wishlist", "Payment Methods", "Privacy and Policy"]


  const signOut = async () => {
    const response = await userLogOut();
    if (response.status !== 200) {
      notify(response.message, "error");
    } else {
      window.location.href = "/";
    }
  }

  return (
    <div className="sticky top-20 hidden sm:block  h-max w-max">
      <ul className="list-none sm:flex flex-col gap-3 max-w-max min-w-max" >
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
    </div>

  )
}

export default AccountSidebar