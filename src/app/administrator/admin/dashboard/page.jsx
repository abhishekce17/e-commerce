import React from 'react'
import styles from "@/Styles/AdminLayout.module.css"
import { BsArrowUpRight, BsFillClipboard2CheckFill, BsFillClipboardPlusFill, BsPersonLinesFill } from 'react-icons/bs';
import { FaBoxOpen } from "react-icons/fa"
import { MdPendingActions } from 'react-icons/md';
import Link from 'next/link';
import { BiChevronsRight } from 'react-icons/bi';
import DoubleLineGraphChart from '@/Components/DoubleLineGraphChart';
import PieChart from '@/Components/PieChart';
import Image from 'next/image';

const page = () => {

  let total = "1,23,456";

  return (
    <div className={styles.dashboard} >
      <div className={styles.dashboard_container} >
        <div className={styles.revenue} >
          <div>
            <BsFillClipboardPlusFill />
            <span> Total sales</span>
          </div>
          <p>₹{total}</p>
          <div>
            <span> <BsArrowUpRight /> 12%</span>
            <span>+10k this week </span>
          </div>
        </div>
        <div className={styles.orders} >
          <div>
            <div>
              <FaBoxOpen />
              <span> Total Orders</span>
            </div>
            <p>₹{total}</p>
            <div>
              <span> <BsArrowUpRight /> 12%</span>
              <span>+10k this week </span>
            </div>
          </div>
          <div className={styles.orders_details} style={{ borderLeft: "1px solid var(--light-bg-color)", paddingLeft: "25px" }} >
            <div>
              <span><BsFillClipboard2CheckFill /> Accepted</span>
              <span>25,125</span>
            </div>
            <div>
              <span><MdPendingActions /> Pending</span>
              <span>25,125</span>
            </div>
          </div>
        </div>
        <div className={styles.customers} >
          <div>
            <BsPersonLinesFill />
            <span> Total Customers</span>
          </div>
          <p>₹{total}</p>
          <div>
            <span> <BsArrowUpRight /> 12%</span>
            <span>+10k this week </span>
          </div>
        </div>
        <div className={styles.graph} >
          <DoubleLineGraphChart />
        </div>
        <div className={styles.pie_chart} >
          <center style={{ paddingBottom: "10px" }} >
            <strong>Sales by category</strong>
          </center>
          <PieChart />
        </div>
        <div className={styles.recent_orders} >
          <center>
            <strong>Recent Orders</strong>
          </center>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
        </div>
        <div className={styles.top_products} >
          <center style={{ paddingBottom: "10px" }} >
            <strong>Top Products</strong>
          </center>
          <div className={styles.heading_row} >
            <div>Product name</div>
            <div>Price</div>
            <div>Sold</div>
            <div>Sales</div>
          </div>
          <div className={styles.value_row} >
            <div>nothing phone 1 144 htz smooth</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <div className={styles.value_row} >
            <div>nothing phone 1</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <div className={styles.value_row} >
            <div>nothing phone 1</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <div className={styles.value_row} >
            <div>realme 11 pro +</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <div className={styles.value_row} >
            <div>samsung galaxy s23 ultra</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <span><Link href={"#"} >view all<BiChevronsRight /></Link></span>
        </div>
      </div>
    </div>
  )
}

export default page