"use client"
import React from 'react'
import styles from "@/Styles/CustomerManagment.module.css"
import { RiAccountCircleFill, RiSearch2Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  let router = useRouter()
  const handleClick = () => {
    router.push("/administrator/admin/product-managment/add-products")
  }
  return (
    <div className={styles.customer_managemnet} >
      <div className={styles.view_customer} >
        <div className={styles.top_bar} >
          <div> <RiSearch2Line style={{ position: "relative", top: "4px" }} /> <input type='text' placeholder='Search by id or mail' /> </div>
        </div>
        <div className={styles.headings} >
          <div>Customer Id</div>
          <div>Mail</div>
          <div>Total Orders</div>
          <div>Recent Order</div>
        </div>
        <div className={styles.customer_info} >
          <div>
            <RiAccountCircleFill className={styles.profile_icon} />
            <Link href={"administrator/admin/customer-managment/customer-details/customer_Id"} >
              <p>#dhsghj5646sd66sk</p>
            </Link>
          </div>
          <div>abhisheklprajapati18@gmail.com</div>
          <div>2250</div>
          <div>12/02/2023</div>
        </div>
        <div className={styles.customer_info} >
          <div>
            <RiAccountCircleFill className={styles.profile_icon} />
            <Link href={"administrator/admin/customer-managment/customer-details/customer_Id"} >
              <p>#dhsghj5646sd66sk</p>
            </Link>
          </div>
          <div>abhisheklprajapati18@gmail.com</div>
          <div>2250</div>
          <div>12/02/2023</div>
        </div>
        <div className={styles.customer_info} >
          <div>
            <RiAccountCircleFill className={styles.profile_icon} />
            <Link href={"administrator/admin/customer-managment/customer-details/customer_Id"} >
              <p>#dhsghj5646sd66sk</p>
            </Link>
          </div>
          <div>abhisheklprajapati18@gmail.com</div>
          <div>2250</div>
          <div>12/02/2023</div>
        </div>
        <div className={styles.customer_info} >
          <div>
            <RiAccountCircleFill className={styles.profile_icon} />
            <Link href={"administrator/admin/customer-managment/customer-details/customer_Id"} >
              <p>#dhsghj5646sd66sk</p>
            </Link>
          </div>
          <div>abhisheklprajapati18@gmail.com</div>
          <div>2250</div>
          <div>12/02/2023</div>
        </div>
        <div className={styles.customer_info} >
          <div>
            <RiAccountCircleFill className={styles.profile_icon} />
            <Link href={"administrator/admin/customer-managment/customer-details/customer_Id"} >
              <p>#dhsghj5646sd66sk</p>
            </Link>
          </div>
          <div>abhisheklprajapati18@gmail.com</div>
          <div>2250</div>
          <div>12/02/2023</div>
        </div>
        <div className={styles.customer_info} >
          <div>
            <RiAccountCircleFill className={styles.profile_icon} />
            <Link href={"administrator/admin/customer-managment/customer-details/customer_Id"} >
              <p>#dhsghj5646sd66sk</p>
            </Link>
          </div>
          <div>abhisheklprajapati18@gmail.com</div>
          <div>2250</div>
          <div>12/02/2023</div>
        </div>
      </div>
    </div>
  )
}

export default page