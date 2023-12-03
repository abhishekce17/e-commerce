"use client"
import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import styles from "../Styles/Navbar.module.css";
import {BiChevronDown} from "react-icons/bi"
import {CgShoppingCart, CgSearch} from "react-icons/cg"
import {RiAccountCircleLine} from "react-icons/ri"
import {useRouter} from "next/navigation";
import UserAuthContext from "@/app/contextProvider";

const Navbar = () => {
  let router = useRouter()
  const context = useContext(UserAuthContext)
  const [categories, setCategories] = useState([])
  const [queryValue, setQueryValue] = useState("");
  const handleQueryRequest = (e) => {
    e.preventDefault()
    router.push("/search/" + queryValue.replace(" ", "-"))
  }
  const handleChange = (e) => {
    setQueryValue(e.target.value)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/fetchCategories");
      const result = await response.json();
      // console.log(result.ctgry)
      if (result.status === 200) {
        setCategories(result.ctgry)
      }
    }
    fetchCategories()
  }, [])
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href={"/"}>Official LOGO</Link>
        </li>
        <li className={styles.dropdown}>
          <span>Categories <BiChevronDown className={styles.down_arrow} /> </span>
          <ul className={styles.dropdownMenu}>
            {
              categories.map((ctg, index) => <li key={ctg + index} >
                <Link href={`/category/${ctg}`}>{ctg.charAt(0).toUpperCase() + ctg.slice(1)}</Link>
              </li>)
            }
            {/* Add more category options here */}
          </ul>
        </li>
        <li>
          <Link href={"/special-deals"}>Deals</Link>
        </li>
        <li className={styles.search_bar} id="search-bar" >
          <form onSubmit={handleQueryRequest} >
            <input type="text" placeholder="Search Product" value={queryValue} onChange={handleChange} spellCheck="false" />
            <CgSearch className={styles.seach_icon} />
          </form>
        </li>
        {
          context.isUserLoggedIn ?
            <li>
              <Link href={"/account/your-account"}><RiAccountCircleLine className={styles.account_icon} />Account</Link>
            </li> :
            <li>
              <Link href={"/authentication/sign-in"}>Sign In</Link>
            </li>
        }
        <li>
          <Link href={"/cart"}><CgShoppingCart className={styles.cart_icon} />Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
