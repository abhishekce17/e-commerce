import React from 'react'
import styles from "@/Styles/OrderManagment.module.css"
import { RiSearch2Line } from 'react-icons/ri'
import OrderManagmentTopbar from '@/Components/OrderManagmentTopbar'
import Link from 'next/link'

const page = () => {
  return (
    <div className={styles.order_managment_page} >
      <div className={styles.order_managment_container} >
        <OrderManagmentTopbar />
        <div className={styles.view_products} >
          <div className={styles.top_bar} >
            <div> <RiSearch2Line style={{ position: "relative", top: "4px" }} /> <input type='text' placeholder='Search Product' /> </div>
          </div>
          <div className={styles.headings} >
            <div>Order ID</div>
            <div>Customer</div>
            <div>Product</div>
            <div>Delivery Date</div>
            <div>Delivery Price</div>
            <div>Delivery Status</div>
            <div>Payment Mode</div>
          </div>
          <div className={styles.product_info} >
            <div> <Link href={"http://localhost:3000/administrator/admin/order-managment/order-details/orderId"} > #AB152CL </Link> </div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.pending} >
            <div>147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.canceled} >
            <div  >147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.accepted} >
            <div  >147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.pending} >
            <div  >147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.pending} >
            <div >147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.accepted} >
            <div >147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.proces} >
            <div>147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.proces} >
            <div >147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
          <div className={styles.product_info} >
            <div>#AB152CL</div>
            <div>Nothing Phone 2 120 Htz</div>
            <div>Mobiles</div>
            <div>2250</div>
            <div>$1522</div>
            <div className={styles.pending} >
            <div >147,523</div>
            </div>
            <div>PhonePe</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page