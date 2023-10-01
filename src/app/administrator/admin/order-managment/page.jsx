"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/Styles/OrderManagment.module.css"
import { RiSearch2Line } from 'react-icons/ri'
import OrderManagmentTopbar from '@/Components/OrderManagmentTopbar'
import Link from 'next/link'
import { BsCartX } from 'react-icons/bs'
import Loading from '../loading'
import Image from 'next/image'

const Page = () => {

  const [ordersSnapDetails, setOrdersSnapDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchOrders = async (query) => {
      const resultData = await fetch(`/api/orders-snap-details`)
      const fetchedOrdersDetails = await resultData.json()
      if (query !== "allorders") {
        setOrdersSnapDetails(fetchedOrdersDetails.data.filter(data => query === data.deliveryStatus.toLowerCase().replaceAll(" ", "")))
      }
      else {
        setOrdersSnapDetails(fetchedOrdersDetails.data)
      }
      setIsLoading(false)
    }
    fetchOrders("allorders")
  }, [])

  function filterOrders(option) {
    setIsLoading(true)
    fetchOrders(option.toLowerCase().replaceAll(" ", ""))
  }



  return (
    <div className={styles.order_managment_page} >
      <div className={styles.order_managment_container} >
        <OrderManagmentTopbar filterOrders={filterOrders} />
        <div className={styles.view_products} >
          <div className={styles.top_bar} >
            <div> <RiSearch2Line style={{ position: "relative", top: "4px" }} /> <input type='text' placeholder='Search Product' /> </div>
          </div>
          <div className={styles.headings} >
            <div>Order ID</div>
            <div>Product</div>
            <div>Customer</div>
            <div>Date</div>
            <div>Price</div>
            <div>Status</div>
            <div>Methode</div>
          </div>
          {isLoading ? Loading() : ordersSnapDetails.length ? <>
            {
              ordersSnapDetails.map((details, index) => {
                return (<div key={index} className={styles.product_info} >
                  <div> <Link href={`/administrator/admin/order-managment/order-details/${details.orderId}`} > {details.orderId} </Link> </div>
                  <div>
                    <Image src={details.productFirtsImgURL} width={100} height={100} alt={details.productName} style={{ marginRight: "10px" }} />
                    <p> {details.productName} </p>
                  </div>
                  <div> {details.customerName} </div>
                  <div> {details.deliveryDate} </div>
                  <div> {details.deliveryPrice} </div>
                  <div className={styles[details.deliveryStatus]} >
                    <div> {details.deliveryStatus} </div>
                  </div>
                  <div> {details.paymentMode} </div>
                </div>)
              })
            }
          </> :
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", color: "GrayText", padding: "100px" }} >
              <BsCartX size={"80px"} style={{ marginBottom: "30px" }} />
              <p>No Orders Found!</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Page