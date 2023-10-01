"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/Styles/CustomerManagment.module.css"
import { RiAccountCircleFill, RiSearch2Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Loading from '../loading'

const Page = () => {
  let router = useRouter()
  const [customerSnapDetails, setCustomerSnapDetails] = useState([])

  const fetchCustomerSnapDetails = async () => {
    const response = await fetch("/api/AdminCustomerSnap/fetchCustomerSnapDetails")
    const result = await response.json()
    if (result.status === 200) {
      setCustomerSnapDetails(result.data)
    }
  }
  useEffect(() => {
    fetchCustomerSnapDetails()
  }, [])

  return (
    <div className={styles.customer_managemnet} >
      <div className={styles.view_customer} >
        <div className={styles.top_bar} >
          <div> <RiSearch2Line style={{ position: "relative", top: "4px" }} /> <input type='text' placeholder='Search by id or mail' /> </div>
        </div>
        <div className={styles.headings} >
          <div>Customer Id</div>
          <div>Name</div>
          <div>Contact</div>
          <div>Total Orders</div>
          <div>Recent Order</div>
        </div>
        {customerSnapDetails.length ?
          customerSnapDetails.map((customer, index) => {
            return (
              <div key={index} className={styles.customer_info} >
                <div>
                  <RiAccountCircleFill className={styles.profile_icon} />
                  <Link href={"administrator/admin/customer-managment/customer-details/customer_Id"} >
                    <p> {customer.customerId} </p>
                  </Link>
                </div>
                <div>{customer.customerName}</div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} >
                  <div>Phone : {customer.contact.phone}</div>
                  <div>
                    Mail : {customer.contact.mail}
                  </div>
                </div>
                <div> {customer.totalOrders} </div>
                <Link href={"/administrator/admin/order-managment/order-details/" + customer.recentOrder.orderId} > {customer.recentOrder.orderId} </Link>
              </div>

            )
          })
          :
          Loading()
        }
      </div>
    </div>
  )
}

export default Page