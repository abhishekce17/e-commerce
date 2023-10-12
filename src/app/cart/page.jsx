"use client"
import styles from "@/Styles/Cart.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Loading from "../administrator/admin/loading";
import Link from "next/link";
import UserAuthContext from "../contextProvider";

const Page = () => {
  const router = useRouter();
  const context = useContext(UserAuthContext)
  const [cartItems, setCartItems] = useState([])
  const [savedItems, setSevedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [subTotal, setSubTotal] = useState({ totalItems: 0, totalAmount: 0 });

  const fetchCart = useCallback(async () => {
    try {
      console.log("fetching")
      const fetchResponse = await fetch("/api/UserInformation/UserCartInfo/fetchCart");
      const responseResult = await fetchResponse.json();
      if (responseResult.status === 200) {
        console.log(responseResult.Cart)
        const cartProduct = responseResult.Cart.filter(x => x.selectedVariant.saveForLater === undefined);
        const saveForLater = responseResult.Cart.filter(x => x.selectedVariant.saveForLater)
        setCartItems(cartProduct)
        setSevedItems(saveForLater)
        setSubTotal({ totalItems: 0, totalAmount: 0 })
        cartProduct.map((item) => {
          const subInfo = item.subInfo;
          setSubTotal((prev) => {
            return { totalAmount: prev.totalAmount + parseInt(subInfo.price - subInfo.price * subInfo.discount / 100) * item.selectedVariant.quantity, totalItems: prev.totalItems + item.selectedVariant.quantity }
          })
        })
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      alert("Server is not responding for your Cart information")
    }
  }
    , []);


  const UpdateStatus = async (cartProductID, status) => {
    setLoading(true)
    const updateResponse = await fetch(`/api/UserInformation/UserCartInfo/UpdateStatus/${status}/${cartProductID}`)
    const result = await updateResponse.json();
    if (result.status == 500) {
      alert("Server is not responding");
    } else {
      context.setRefresh(!context.refresh);
    }
  }

  useEffect(() => {
    fetchCart()
  }, [context.refresh])

  const handleRemoveItem = async (cartProductID) => {
    setLoading(true)
    const updateResponse = await fetch(`/api/UserInformation/UserCartInfo/RemoveItems/${cartProductID}`)
    const result = await updateResponse.json();
    if (result.status == 500) {
      alert("Server is not responding");
    } else {
      context.setRefresh(!context.refresh);
    }
  };


  const UpdateQuantity = async (cartProductID, action) => {
    setLoading(true)
    const updateResponse = await fetch(`/api/UserInformation/UserCartInfo/UpdateQuantity/${action}/${cartProductID}`)
    const result = await updateResponse.json();
    if (result.status == 500) {
      alert("Server is not responding");
    } else {
      context.setRefresh(!context.refresh);
    }
  }

  const handleProceedToCheckout = () => {
    router.push("/place-your-order/order-summary")
    // Logic to navigate to the checkout Page
  };

  const handleContinueShopping = () => {
    // Logic to navigate back to the home Page
  };

  const renderCartItems = () => {
    return cartItems.map((item, index) => (
      <div key={item.cartProductId}>
        <Image src={item.productFirtsImgURL} width={500} height={500} alt={item.productName} />
        <div>
          <div style={{ paddingTop: "15px", paddingBottom: "15px", lineHeight: "1.5" }} >
            <Link href={{ pathname: `/product/${item.productId}`, query: item.selectedVariant.variant }} >
              <h4>{item.productName}</h4>
            </Link>
            {Object.keys(item.selectedVariant.variant).sort().map(key => <p key={key} > {key} : {item.selectedVariant.variant[key]}</p>)}
            <p>Price: ₹{item.subInfo.price.toLocaleString("en-IN", { useGrouping: true })}</p>
            <p>Discount: {item.subInfo.discount}</p>
            <p>Effective Price: ₹{parseInt(item.subInfo.price - item.subInfo.price * item.subInfo.discount / 100).toLocaleString("en-IN", { useGrouping: true })} </p>
            <p>Quantity: {item.selectedVariant.quantity}</p>
            <div className={styles.quantity}>
              <button type="button" className={styles.increase_quantity} onClick={() => item.selectedVariant.quantity > 1 && UpdateQuantity(item.cartProductId, "DecreaseQuantity")}>
                -
              </button>
              <button className={styles.decrease_quantity} type="button" onClick={() => UpdateQuantity(item.cartProductId, "IncreaseQunatity")}>
                +
              </button>
            </div>
            <button onClick={() => handleRemoveItem(item.cartProductId)}>Remove</button>
            <button onClick={() => UpdateStatus(item.cartProductId, "SaveForLater")}>save for later</button>
          </div>
        </div>
      </div>
    ));
  };

  const renderSavedItems = () => {
    return savedItems.map((item, index) => (
      <div key={item.cartProductId}>
        <Image src={item.productFirtsImgURL} width={500} height={500} alt={item.productName} />
        <div>
          <div style={{ paddingTop: "15px", paddingBottom: "15px", lineHeight: "1.5" }} >
            <Link href={{ pathname: `/product/${item.productId}`, query: item.selectedVariant.variant }} >
              <h4>{item.productName}</h4>
            </Link>
            {Object.keys(item.selectedVariant.variant).sort().map(key => <p key={key} > {key} : {item.selectedVariant.variant[key]}</p>)}
            <p>Price: ₹{item.subInfo.price.toLocaleString("en-IN", { useGrouping: true })}</p>
            <p>Discount: {item.subInfo.discount}</p>
            <p>Effective Price: ₹{parseInt(item.subInfo.price - item.subInfo.price * item.subInfo.discount / 100).toLocaleString("en-IN", { useGrouping: true })} </p>
            <p>Quantity: {item.selectedVariant.quantity}</p>
            <button onClick={() => handleRemoveItem(item.cartProductId)}>Remove</button>
            <button onClick={() => UpdateStatus(item.cartProductId, "MoveToCart")}>Move to Cart</button>
          </div>
        </div>
      </div>
    ));
  };



  return (<>
    {
      context.isUserLoggedIn ?
        <div className={styles.cart} >
          <h2>Shopping Cart</h2>
          {
            loading ? Loading() :
              <div className={styles.cart_container}>
                <div>
                  <div className={styles.cart_items} >
                    <h3>Cart Items:</h3>
                    {cartItems.length > 0 ? (
                      renderCartItems()
                    ) : (
                      <p>Your cart is empty. Continue shopping!</p>
                    )}
                  </div>
                  {savedItems.length > 0 && (
                    <div className={styles.save_for_later} >
                      <h3>Save for Later:</h3>
                      {renderSavedItems()}
                    </div>
                  )}
                </div>
                {cartItems.length ? <div className={styles.subtotal_total} >
                  <p>Subtotal <span>({subTotal.totalItems} items)</span> : ₹{subTotal.totalAmount.toLocaleString("en-IN", { useGrouping: true })}</p>
                  <button className={styles.action_proceed} onClick={handleProceedToCheckout}>Proceed to Checkout</button>
                  <button className={styles.action} onClick={handleContinueShopping}>Continue Shopping</button>
                </div> : undefined}
              </div>
          }
        </div>
        :
        router.push("/authentication/sign-in")
    }
  </>
  );
};

export default Page;
