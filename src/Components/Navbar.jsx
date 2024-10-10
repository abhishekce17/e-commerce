import Link from "next/link";
import { BiChevronDown } from "react-icons/bi"
import { CgShoppingCart } from "react-icons/cg"
import { RiAccountCircleLine } from "react-icons/ri"
import { PrimaryButton } from "./PrimaryButton";
import { SearchBar } from "./SearchBar";
import { fetchCategory } from "@/actions/fetchCategory";
import { cookies } from "next/headers";
import SideBar from "./SideBar";

export default async function Navbar() {
  const categories = await fetchCategory()
  const cookie = cookies();
  const validToken = cookie.get("authToken");

  return (<>
    <nav className="h-16 bg-white px-4 lg:px-24 sticky top-0 z-50 shadow-sm">
      <ul className="visible lg:flex justify-between text-xl font-semibold text-custom-dark-gray items-center h-16 hidden lg:visible">
        <li>
          <Link href={"/"}>Official LOGO</Link>
        </li>
        <li className="group hover:text-black">
          <span className="flex items-center pl-4 cursor-pointer">
            Categories <BiChevronDown className="-rotate-90 group-hover:rotate-0 transition duration-200" />
          </span>
          <ul className="absolute bg-white z-10 rounded text-lg font-medium leading-relaxed h-0 group-hover:border group-hover:py-3 group-hover:h-fit overflow-hidden transition-transform duration-700">
            {categories.map((ctg, index) => (
              <li key={ctg.docId} className="px-4 hover:bg-primary-light hover:text-white">
                <Link href={`/category/${ctg.category}`} className="block w-full">
                  {ctg.category.charAt(0).toUpperCase() + ctg.category.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="hover:text-black">
          <Link href={"/special-deals"}>Deals</Link>
        </li>
        <li className="grow max-w-sm hover:text-black" id="search-bar">
          <SearchBar />
        </li>
        <li className="hover:text-black">
          {validToken ?
            <Link href={"/account"} className="flex items-center" >
              <RiAccountCircleLine className="text-primary" size={28} />Account
            </Link>
            :
            <PrimaryButton label="Sign in" href="/sign-in" />
          }
        </li>
        <li className="hover:text-black">
          {validToken ? <Link href={"/cart"} className="flex items-center">
            <CgShoppingCart className="text-primary" size={28} /> Cart
          </Link>
            :
            <a href={"/cart"} className="flex items-center">
              <CgShoppingCart className="text-primary" size={28} /> Cart
            </a>}
        </li>
      </ul>
      <SideBar categories={categories} validToken={validToken} />
    </nav>

  </>
  );
}