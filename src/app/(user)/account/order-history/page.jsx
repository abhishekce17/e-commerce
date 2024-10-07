"use client"
import { dateFormate } from "@/utils/dateFormate";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Page = () => {
  const orderHistory = useSelector(state => state.userData.userData.OrderDetails);
  // Dummy order data

  return (
    <div className="grow" >
      {orderHistory.map((product, orderIndex) => (
        <div key={`${product.productId} ${product.variant} ${orderIndex}`} className="flex gap-3 border-b border-primary-light last:border-none mb-3 last:m-0" >
          <Link href={`/product/${product.productId}`} className="aspect-square w-52" >
            <Image height={520} width={520} src={product.productFirtsImgURL} alt={product.productName} />
          </Link>
          <div>
            <strong>{product.productName}</strong>
            <p>{Object.entries(product.variant).map(([key, value]) => `${key} : ${value}`).join(', ')}</p>
            <p>₹{product.price.toLocaleString("en-IN", { useGrouping: true })}</p>
            <p>No. of product {product.quantity}</p>
            <p>Order on {dateFormate(product.timestamp.seconds)}</p>
            <p>{product.deliveryStatus}</p>
            <p>Expected Delivery till {dateFormate(product.expectedDeliveryDate.seconds)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
