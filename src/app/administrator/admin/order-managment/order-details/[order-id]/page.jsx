import React from 'react'
import styles from "@/Styles/OrderManagment.module.css"
import Image from 'next/image'
import { RiAccountCircleFill } from "react-icons/ri"


const page = () => {
    return (
        <div className={styles.order_details_page} >
            <div className={styles.order_details_container} >
                <div className={styles.product_details} >
                    <Image src={"/category.jpg"} width={300} height={300} alt='name' />
                    <div>
                        <h2>Nothing Phone 2 120 Htz</h2>
                        <p>variant</p>
                        <div>
                            <div>red</div>
                            <div> 6GB + 128GB</div>
                        </div>
                    </div>
                </div>
                <div className={styles.customer_details} >
                    <div>
                        <span style={{ color: "var(--light-bg-color)", fontSize: "2rem", position: "relative", top: "7px" }} > <RiAccountCircleFill /> </span>
                        <span>Abhishek Prajapti</span>
                    </div>
                    <div className={styles.billing_address} >
                        <p>Billing Address:</p>
                        <div>
                            <p>7977521717</p>
                            <div>
                                room no. five, galli no six/B, 30 feet road, matanagrishi nagar mankhurd mandala mumbai
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.order_status} >
                    <div>
                        <p>Dilivery Date</p>
                        <div>12/07/2023</div>
                    </div>
                    <div>
                        <p>Delivery Price</p>
                        <div>$1299</div>
                    </div>
                    <div>
                        <p>Payment Method</p>
                        <div>Google Pay</div>
                    </div>
                    <div>
                        <p>Order ID</p>
                        <div>
                            #123596546
                        </div>
                    </div>
                    <div>
                        <p>Status</p>
                        <div>Pending</div>
                    </div>
                </div>
                <button className={styles.accept_button} >Accept</button>
            </div>
        </div>
    )
}

export default page