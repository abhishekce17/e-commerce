"use client"
import Link from 'next/link';
import { CgShoppingCart } from 'react-icons/cg';
import { HiOutlineLogout } from 'react-icons/hi';
import { GoSignIn } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import { RxDashboard } from 'react-icons/rx';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { MdDiscount, MdOutlineCategory } from 'react-icons/md';
import { BsPersonLinesFill } from 'react-icons/bs'
import { PrimaryButton } from './PrimaryButton';
import { SearchBar } from './SearchBar';
import { useEffect, useRef, useState } from 'react';
import { userLogOut } from '@/actions/userLogOut';
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { notify } from '@/utils/notify';


const SideBar = ({ categories, validToken }) => {
    const sidebarRef = useRef(null);
    const toggleButtonRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const signOut = async () => {
        const response = await userLogOut();
        notify("signing out...", "loading");
        if (response.status !== 200) {
            notify(response.message, "error");
        } else {
            window.location.href = "/";
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                toggleButtonRef.current &&
                !toggleButtonRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <ul className="flex lg:hidden justify-between text-xl font-semibold text-custom-dark-gray items-center h-16 lg:invisible">
                <li className="flex gap-3 grow -space-y-0.5 items-center" id="search-bar">
                    <SearchBar />
                    <span ref={toggleButtonRef} >
                        <FiMenu onClick={() => setIsSidebarOpen(true)} size={35} />
                    </span>
                </li>
            </ul>
            <div ref={sidebarRef} className={`h-screen flex lg:hidden lg:invisible fixed z-50 border right-0 transition duration-300 inset-y-0 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}  >

                <Sidebar className="h-full" backgroundColor="#fff" collapsed={false}
                >
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active }) => {
                                if (level === 0)
                                    return {
                                        ":hover": { backgroundColor: active ? '#b2a1de' : "auto" },
                                        border: "1px solid transparent",
                                        backgroundColor: active ? '#6947BF' : "",
                                        color: active ? "white" : "black"
                                    };
                            },
                        }}

                    >
                        <MenuItem
                            icon={<RxCross1 />}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            Official Logo
                        </MenuItem>
                        <MenuItem
                            icon={<RxDashboard className=" text-primary" />}
                            component={<Link href={"/"} />}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            Home
                        </MenuItem>
                        <SubMenu label="Category" icon={<MdOutlineCategory className=" text-primary" />}>
                            {categories.map((ctg, index) => (
                                <MenuItem onClick={() => setIsSidebarOpen(false)} key={ctg.docId} component={<Link href={`/category/${ctg.category}`} className="block w-full" />} >  {ctg.category.charAt(0).toUpperCase() + ctg.category.slice(1)}</MenuItem>
                            ))}
                        </SubMenu>
                        <MenuItem
                            icon={<MdDiscount className=" text-primary" />}
                            component={<Link href={"/special-deals"} />}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            Deals
                        </MenuItem>
                        <MenuItem
                            icon={<CgShoppingCart className=" text-primary" />}
                            component={<a href={"/cart"} />}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            Cart
                        </MenuItem>
                        {validToken ? <SubMenu label="Account" icon={<BsPersonLinesFill className=" text-primary" />}>
                            <MenuItem onClick={() => setIsSidebarOpen(false)} component={<Link href={"/account"} />} > Profile</MenuItem>
                            <MenuItem onClick={() => setIsSidebarOpen(false)} component={<Link href={"/account/order-history"} />} > Order History</MenuItem>
                            <MenuItem onClick={() => setIsSidebarOpen(false)} component={<Link href={"/account/wishlist"} />} > Wishlist</MenuItem>
                            <MenuItem onClick={() => setIsSidebarOpen(false)} component={<Link href={"/account/payment-methods"} />} > Payment Methods</MenuItem>
                            <MenuItem onClick={() => setIsSidebarOpen(false)} component={<Link href={"/account/privacy-and-policy"} />} > Privacy and Policy</MenuItem>
                        </SubMenu>
                            :
                            <MenuItem
                                icon={<GoSignIn className=" text-primary" />}
                                component={<Link href="/sign-in" />}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Sign
                            </MenuItem>}
                        {validToken && <MenuItem
                            onClick={signOut}
                            icon={<HiOutlineLogout className=" text-primary" />}

                        >
                            Log out
                        </MenuItem>}
                    </Menu>
                </Sidebar>
            </div>
        </>
    );
};

export default SideBar;
