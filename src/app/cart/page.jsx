"use client"
import styles from "@/Styles/Cart.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from 'react';

const page = () => {
  let router = useRouter()
  let cartItems = [
    {
      id: 1,
      name: 'Mobile Phone',
      variant: 'Phantom Black',
      storage: '4GB + 64GB',
      price: 9999,
      quantity: 2,
    },
    {
      id: 1,
      name: 'Mobile Phone',
      variant: 'Phantom Black',
      storage: '4GB + 64GB',
      price: 9999,
      quantity: 7,
    }
  ];

  // cartItems = []

  const savedItems = [
    {
      id: 2,
      name: 'Headphones',
      variant: 'Wireless',
      price: 499,
    },
    // Add more saved items as needed
  ];

  const handleRemoveItem = (itemId) => {
    // Logic to remove item from the cart or saved items
  };

  const handleIncreaseQuantity = (itemId) => {
    // Logic to increase the quantity of a cart item
  };

  const handleMoveToCart = (itemId) => {
    // Logic to move item from "Save for Later" to cart
  };
  const handleSaveForLater = (itemId) => {

  }
  const handleProceedToCheckout = () => {
    router.push("/place-your-order/order-summary")
    // Logic to navigate to the checkout page
  };

  const handleContinueShopping = () => {
    // Logic to navigate back to the home page
  };

  const renderCartItems = () => {
    return cartItems.map((item) => (
      <div key={item.id}>
        <Image src={"/category.jpg"} width={500} height={500} alt={item.name} />
        <div>
          <div>
            <h4>{item.name}</h4>
            <p>{item.variant}</p>
            <p>{item.storage}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          <button onClick={() => handleIncreaseQuantity(item.id)}>Add</button>
          <button onClick={() => handleSaveForLater(item.id)}>save for later</button>
        </div>
      </div>
    ));
  };

  const renderSavedItems = () => {
    return savedItems.map((item) => (
      <div key={item.id}>
        <Image src={"/category.jpg"} width={500} height={500} alt={item.name} />
        <div>
          <div>
            <h4>{item.name}</h4>
            <p>Variant: {item.variant}</p>
            <p>Storage: {item.storage}</p>
            <p>Price: ${item.price}</p>
          </div>
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          <button onClick={() => handleMoveToCart(item.id)}>Move to Cart</button>
        </div>
      </div>
    ));
  };

  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return subtotal;
  };

  return (
    <div className={styles.cart} >
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className={styles.cart_container}>
          <div>
            <div className={styles.cart_items} >
              <h3>Cart Items:</h3>
              {renderCartItems()}
            </div>
            {savedItems.length > 0 && (
              <div className={styles.save_for_later} >
                <h3>Save for Later:</h3>
                {renderSavedItems()}
              </div>
            )}
          </div>
          <div className={styles.subtotal_total} >
            <p>Subtotal <span>({cartItems.reduce( (item1, item2) => item1.quantity + item2.quantity )} items)</span> : ${calculateSubtotal()}</p>
            <button className={styles.action_proceed} onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            <button className={styles.action} onClick={handleContinueShopping}>Continue Shopping</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty. Continue shopping!</p>
      )}
    </div>
  );
};

export default page;
