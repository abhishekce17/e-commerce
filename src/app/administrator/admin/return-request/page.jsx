import React from 'react'
import styles from "@/Styles/OrderManagment.module.css"
import Link from 'next/link'



const Page = () => {
  return (
    <div className={styles.order_managment_page} >
      <div className={styles.order_managment_container} >
        <div className={`${styles.view_products} ${styles.return_request}`} >
          <div style={{ padding: "25px" }} className={styles.headings} >
            <div>Order ID</div>
            <div>Customer</div>
            <div>Product</div>
            <div>Delivery Date</div>
            <div>Delivery Price</div>
            <div>Action</div>
            <div>Payment Mode</div>
          </div>
          <div className={styles.product_info} >
            <div> <Link href={`/administrator/admin/order-managment/order-details/orderId`} > #AB152CL </Link> </div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div style={{ cursor: "default" }} >
              <div className={styles.proces} style={{ marginRight: "10px" }} >
                <div>Accept</div>
              </div>
              <div className={styles.canceled} >
                <div>Cancel</div>
              </div>
            </div>
            <div>PhonePe</div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Page