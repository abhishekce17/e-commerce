import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CgNotes } from 'react-icons/cg';
import { HiMenu, HiOutlineLogout } from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaBoxOpen, FaShoppingBasket, FaStore } from 'react-icons/fa';
import { TbTruckReturn } from "react-icons/tb"
import { MdAnalytics, MdDiscount, MdOutlineCategory, MdOutlineFeaturedPlayList, MdOutlineInventory } from 'react-icons/md';
import { BsPersonLinesFill } from 'react-icons/bs'
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const pathname = usePathname()
  let route = pathname.split("/")[3];
  useEffect(() => {
    setActiveMenuItem(route)
  }, [pathname])

  return (
    <Sidebar style={{minHeight:"100vh"}} backgroundColor="#fff" collapsed={false}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0)
              return {
                ":hover": { backgroundColor: active ? 'rgba(56, 250, 185, 0.66)' : "auto" },
                border: "1px solid transparent",
                backgroundColor: active ? 'rgba(56, 250, 185, 0.66)' : undefined,
              };
          },
        }}
      >
        {/* <MenuItem
          icon={<HiMenu />}
          component={<span/>}
          active={activeMenuItem === 'profile'}
          onClick={() => handleMenuItemClick('profile')}
        >
        </MenuItem> */}
        <MenuItem
          icon={<RxDashboard />}
          component={<Link href={"/administrator/admin/dashboard"} />}
          active={activeMenuItem === 'dashboard'}
          onClick={() => handleMenuItemClick('dashboard')}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          icon={<FaShoppingBasket />}
          active={activeMenuItem === 'product-managment'}
          component={<Link href={"/administrator/admin/product-managment"} />}
          onClick={() => handleMenuItemClick('product-managment')}
        >
          Products
        </MenuItem>
          <MenuItem
            active={activeMenuItem === 'order-managment'} icon={<FaBoxOpen />}
            component={<Link href={"/administrator/admin/order-managment"} />}
            onClick={() => handleMenuItemClick('order-managment')}
          >
          Orders
          </MenuItem>
        <MenuItem
          icon={<MdOutlineCategory />}
          component={<Link href={"/administrator/admin/category-managment"} />}
          active={activeMenuItem === 'category-managment'}
          onClick={() => handleMenuItemClick('category-managment')}
        >
          Category
        </MenuItem>
        <MenuItem
          icon={<MdOutlineInventory />}
          component={<Link href={"/administrator/admin/inventory-managment"} />}
          active={activeMenuItem === 'inventory-managment'}
          onClick={() => handleMenuItemClick('inventory-managment')}
        >
          Inventory
        </MenuItem>
        <MenuItem
          icon={<BsPersonLinesFill />}
          component={<Link href={"/administrator/admin/customer-managment"} />}
          active={activeMenuItem === 'customer-managment'}
          onClick={() => handleMenuItemClick('customer-managment')}
        >
          Customer
        </MenuItem>
        <MenuItem
          icon={<MdDiscount />}
          component={<Link href={"/administrator/admin/special-deals"} />}
          active={activeMenuItem === 'special-deals'}
          onClick={() => handleMenuItemClick('special-deals')}
        >
          Special deals
        </MenuItem>
        <MenuItem
          icon={<MdOutlineFeaturedPlayList />}
          component={<Link href={"/administrator/admin/featured-product"} />}
          active={activeMenuItem === 'featured-product'}
          onClick={() => handleMenuItemClick('featured-product')}
        >
          Feature product
        </MenuItem>
        <MenuItem
          icon={<TbTruckReturn />}
          component={<Link href={"/administrator/admin/return-request"} />}
          active={activeMenuItem === 'return-requests'}
          onClick={() => handleMenuItemClick('return-requests')}
        >
          Return requests
        </MenuItem>
        {/* <MenuItem
        icon={<MdAnalytics />}
          component={<Link href={"/administrator/admin/analytics-and-reporting"} />}
          active={activeMenuItem === 'analytics-and-reporting'}
          onClick={() => handleMenuItemClick('analytics-and-reporting')}
        >
          Analytics and reporting
        </MenuItem> */}
        <MenuItem
          icon={<CgNotes />}
          component={<Link href={"/administrator/admin/help-and-faq"} />}
          active={activeMenuItem === 'help-and-faq'}
          onClick={() => handleMenuItemClick('help-and-faq')}
        >
          Help and FAQ
        </MenuItem>
        <MenuItem
          icon={<FaStore />}
          component={<Link href={"/administrator/admin/about-us"} />}
          active={activeMenuItem === 'about-us'}
          onClick={() => handleMenuItemClick('about-us')}
        >
          About us
        </MenuItem>
        <MenuItem
          icon={<HiOutlineLogout />}
        >
          Log out
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AdminSidebar;
