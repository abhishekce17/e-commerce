"use client"
import styles from "@/Styles/OrderDetails.module.css"
import Image from "next/image";

const OrderDetailsPage = () => {
  // Sample order data
  const order = {
    deliveryAddress: {
      houseNo: '123',
      area: 'Main Street',
      landmark: 'Near Park',
      city: 'Cityville',
      state: 'Stateville',
      pincode: '12345'
    },
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    product: {
      productName: 'Example Product',
      image: "/category.jpg",
      price: '$9.99',
      variant: 'Large',
      placedDate: '2023-06-18',
      deliveredDate: '2023-06-20'
    }
  };

  const handleDownloadInvoice = () => {
    // Logic to download the invoice
    console.log('Downloading invoice...');
  };

  const handleReturnRquest = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.order_details_page} >
      <div className={styles.order_details_container} >
        <div>
          <h3>Contact Information</h3>
          <p><strong>Name</strong>: {order.name}</p>
          <p><strong>Phone Number</strong>: {order.phoneNumber}</p>
          <h3>Delivery Address</h3>
          <p><strong>House No</strong>: {order.deliveryAddress.houseNo}</p>
          <p><strong>Area</strong>: {order.deliveryAddress.area}</p>
          <p><strong>Landmark</strong>: {order.deliveryAddress.landmark}</p>
          <p><strong>City</strong>: {order.deliveryAddress.city}</p>
          <p><strong>State</strong>: {order.deliveryAddress.state}</p>
          <p><strong>Pincode</strong>: {order.deliveryAddress.pincode}</p>
        </div>
        <div className={styles.pro_info} >
          <h3>Product Information</h3>
          <Image height={520} width={520} src={order.product.image} alt={order.product.name} />
          <div>
            <p>{order.product.productName}</p>
            <p>{order.product.price}</p>
            <p>{order.product.variant}</p>
            <p>Place ordered on: {order.product.placedDate}</p>
            <p>Delivered on: {order.product.deliveredDate}</p>
          </div>
            <button className={styles.request_return} onClick={handleReturnRquest}>Request Return</button>
        </div>
        <div className={styles.invoice} >
          <p>Get your invoice in your pocket</p>
          <button onClick={handleDownloadInvoice}>Download Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
