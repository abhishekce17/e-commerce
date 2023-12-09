"use client"
import {useContext, useEffect, useState} from 'react';
import styles from '@/Styles/OrderSummary.module.css';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import UserAuthContext from '@/app/contextProvider';

const Page = () => {
  const context = useContext(UserAuthContext);
  const {Personal, buyingProduct} = context;
  let delivery_charges = 79;
  let router = useRouter()
  const [billingAddress, setBillingAddress] = useState({
    name: 'John Doe',
    phone: 123456789,
    address: {
      house_no: '123 mail city',
      area: 'mankhurd',
      landmark: 'sudarshan dairy',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400043',
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [productSummary, setProductSummary] = useState([
    {
      name: 'Dummy Product 1',
      price: 19.99,
      image: '/category.jpg',
      variant: 'Blue',
      quantity: 2,
    },
    {
      name: 'Dummy Product 2',
      price: 24.99,
      image: '/category.jpg',
      variant: 'Red',
      quantity: 1,
    },
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    router.push("/place-your-order/checkout")
    // Logic to handle form submission and process the order
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Logic to save the updated billing address
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    const updatedAddress = {...billingAddress.address, [name]: value};
    setBillingAddress((prevState) => ({
      ...prevState,
      address: updatedAddress,
    }));
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    productSummary.forEach((product) => {
      subtotal += product.price * product.quantity;
    });
    return subtotal;
  };

  const calculateOrderTotal = () => {
    let total = 0;
    total = calculateSubtotal() + delivery_charges;
    return total;
  };

  const estimatedDeliveryDate = 'June 30, 2023';
  useEffect(() => {
    console.log(buyingProduct, Personal);
  }, []);

  return (

    <div className={styles.order_summary}>
      <h2>Summary</h2>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div>
          <h3>Billing Information</h3>
          <div className={styles.personal_information}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={billingAddress.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={billingAddress.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <div className={styles.billing_address}>
              <label htmlFor="address">Flat, House no., Building, Company, Apartment:</label>
              <input
                type="text"
                id="house_no"
                name="house_no"
                value={billingAddress.address.house_no}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <label htmlFor="address">Area, Locality:</label>
              <input
                type="text"
                id="area"
                name="area"
                value={billingAddress.address.area}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <label htmlFor="address">Landmark:</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={billingAddress.address.landmark}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <label htmlFor="address">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={billingAddress.address.city}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <label htmlFor="address">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={billingAddress.address.state}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <label htmlFor="address">Pincode:</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={billingAddress.address.pincode}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          {isEditing ? (
            <button type="button" onClick={handleSaveClick} className={styles.editing}>
              Save
            </button>
          ) : (
            <button type="button" onClick={handleEditClick} className={styles.editing}>
              Edit
            </button>
          )}
          <div className={styles.product_summary}>
            <h3>Product Summary</h3>
            {productSummary.map((product, index) => (
              <div key={index} className={styles.product}>
                <Image src={product.image} width={500} height={500} alt={product.name} />
                <div>
                  <p>{product.name}</p>
                  <p>{product.variant}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.amount_date}>
          <h3>Order Total</h3>
          <p>Delivery Charges: {delivery_charges}</p>
          <p>
            Subtotal({productSummary.reduce((item1, item2) => item1.quantity + item2.quantity)} items): {calculateSubtotal()}
          </p>
          <p>Total: ${calculateOrderTotal()}</p>
          <h3>Estimated Delivery Date</h3>
          <p>{estimatedDeliveryDate}</p>
          <button type="submit" className={styles.action_proceed}>
            Place Order
          </button>
        </div>
      </form>
    </div>

  );
};

export default Page;
