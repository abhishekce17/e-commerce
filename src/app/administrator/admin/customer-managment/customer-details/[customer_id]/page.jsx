"use client"
import React, { useState } from 'react'
import styles from "@/Styles/CustomerManagment.module.css"
import { MdDeleteOutline } from 'react-icons/md'
import { RiAccountCircleFill } from "react-icons/ri"


const page = () => {
    const [navigationValue, setNavigationVAlue] = useState("orders")

    const handleNaviagation = (value) => {
        setNavigationVAlue(value)
    }

    return (
        <div className={styles.customer_details_page} >
            <div className={styles.customer_details_container} >
                <div className={styles.customer_details} >
                    <div>
                        <span style={{ color: "var(--light-bg-color)", fontSize: "2rem", position: "relative", top: "7px" }} > <RiAccountCircleFill /> </span>
                        <span>Abhishek Prajapti</span>
                    </div>
                    <div className={styles.billing_address} >
                        <p>Email</p>
                        <div>abhisheklprajapati18@gmail.comm</div>
                        <p>Billing Address:</p>
                        <div>
                            <p>7977521717</p>
                            <div>
                                room no. five, galli no six/B, 30 feet road, matanagrishi nagar mankhurd mandala mumbai
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.navigation}>
                    <div onClick={() => { handleNaviagation("orders") }} className={navigationValue === "orders" && styles.selected} >Orders</div>
                    <div onClick={() => { handleNaviagation("review") }} className={navigationValue === "review" && styles.selected} >Reviews/Ratings</div>
                </div>

                {
                    navigationValue === "orders" &&
                    <div className={styles.orders_details} >
                        <div className={styles.inner_headings} >
                            <div>Order ID</div>
                            <div>Product</div>
                            <div>Buy Date</div>
                            <div>Delivery Price</div>
                            <div>Status</div>
                            <div>Payment Mode</div>
                        </div>
                        <div className={styles.each_order_details} >
                            <div>#6w4d65f6safdsd</div>
                            <div>Nothing Phone 2 120Htz</div>
                            <div>12/07/20023</div>
                            <div>$1652</div>
                            <div className={`${styles.order_status} ${styles.pendig}`} >
                                <div>Pending</div>
                            </div>
                            <div>Cash On Delivery</div>
                        </div>
                        <div className={styles.each_order_details}  >
                            <div>#6w4d65f6safdsd</div>
                            <div>Nothing Phone 2 120Htz</div>
                            <div>12/07/20023</div>
                            <div>$1652</div>
                            <div className={styles.order_status} >
                                <div>Pending</div>
                            </div>
                            <div>Cash On Delivery</div>
                        </div>
                    </div>
                }

                {
                    navigationValue === "review" &&
                    <div className={styles.review_ratings} >
                        <div className={`${styles.inner_headings} ${styles.reviews
                            }`} >
                            <div>Product ID</div>
                            <div>Product</div>
                            <div>Review</div>
                            <div>Rating</div>
                            <div>Timestamp</div>
                        </div>
                        <div className={styles.each_reviews_ratings} >
                            <div>#6w4d65f6safdsd</div>
                            <div>Nothing Phone 2 120Htz</div>
                            <div>Good product i like the it, it is very usefull</div>
                            <div>1235</div>
                            <div>12/02/2102</div>
                            <div><MdDeleteOutline /> </div>
                        </div>
                    </div>
                }

                <button className={styles.accept_button} >Delete Account</button>
                <button className={styles.accept_button} >Ban Temporally</button>
            </div>
        </div>
    )
}

export default page