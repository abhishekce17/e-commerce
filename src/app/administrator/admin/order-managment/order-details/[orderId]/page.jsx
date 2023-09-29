"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/Styles/OrderManagment.module.css"
import Image from 'next/image'
import { RiAccountCircleFill } from "react-icons/ri"
import Loading from '../../../loading'

const page = ({ params }) => {

    function dateFormate(seconds) {
        const timestampInSeconds = seconds; // Replace with your timestamp
        const date = new Date(timestampInSeconds * 1000); // Convert to milliseconds

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are zero-based
        const year = date.getUTCFullYear();

        // Pad single-digit day and month values with leading zeros if needed
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        return formattedDate; // Output: 14/04/2023
    }

    let date = new Date();
    const [orderDetails, setOrderDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const fetchOrders = async () => {
        const resultData = await fetch(`/api/AdminOrderDetails/${params.orderId}`)
        const fetchedOrdersDetails = await resultData.json()
        setOrderDetails(fetchedOrdersDetails.data)
        setIsLoading(false)
        console.log(orderDetails.items)
    }
    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className={styles.order_details_page} >
            {orderDetails.items !== undefined ?
                <div className={styles.order_details_container} >
                    {
                        orderDetails.items.map((productsDetails, index) => {
                            return (
                                <div className={styles.product_details} key={index} >
                                    <Image src={productsDetails.productFirtsImgURL} width={300} height={300} alt='name' />
                                    <div>
                                        <h2>{productsDetails.name}</h2>
                                        <div>
                                            <div>
                                                <p>variant</p>
                                                <div>
                                                    {productsDetails.variant.map((value, key) => {
                                                        return (
                                                            <>
                                                                <div> {value.type} </div>
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div>
                                                <p>Quantity</p>
                                                <div>
                                                    <div> {productsDetails.quantity} </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p>Price</p>
                                                <div>
                                                    <div> {productsDetails.price} </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p>Sub Total</p>
                                                <div>
                                                    <div> {productsDetails.subtotal} </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={styles.customer_details} >
                        <div>
                            <span style={{ color: "var(--light-bg-color)", fontSize: "2rem", position: "relative", top: "7px" }} > <RiAccountCircleFill /> </span>
                            <span>{orderDetails.customerContact.name}</span>
                        </div>
                        <div> <p style={{ color: "GrayText" }} > customer id : {orderDetails.customerId} </p> </div>
                        <div className={styles.billing_address} >
                            <p>Billing Address:</p>
                            <div>
                                <p>{orderDetails.customerContact.phone}</p>
                                <p> {orderDetails.customerContact.email} </p>
                                <div>
                                    {orderDetails.billingAddress}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.order_status} >
                        <div>
                            <p>Dilivery Date</p>
                            <div>{dateFormate(orderDetails.deliveryDate.seconds)}</div>
                        </div>
                        <div>
                            <p>Delivery Price</p>
                            <div> {orderDetails.totalAmount} </div>
                        </div>
                        <div>
                            <p>Payment Method</p>
                            <div> {orderDetails.paymentMethod} </div>
                        </div>
                        <div>
                            <p>Order ID</p>
                            <div>
                                {orderDetails.orderId}
                            </div>
                        </div>
                        <div>
                            <p>Status</p>
                            <div> {orderDetails.orderStatus} </div>
                        </div>
                    </div>
                    <button className={styles.accept_button} >Accept</button> // onclick make changes in status and make visible a button to  generate and also able to print a bill
                </div>
                : Loading()
            }
        </div>
    )
}

export default page