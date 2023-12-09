"use client"
import {useContext, useEffect, useState} from 'react';
import styles from '@/Styles/OrderSummary.module.css';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import UserAuthContext from '@/app/contextProvider';

const Page = () => {
  const context = useContext(UserAuthContext);
  const {buyingProduct, userData: {Personal}} = context;
  let delivery_charges = 79;
  let router = useRouter()
  const [billingAddress, setBillingAddress] = useState({...Personal, ...Personal.contact});
  const [isEditing, setIsEditing] = useState(false);
  const [productSummary, setProductSummary] = useState(context.buyingProduct);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    context.setPaymentInfo({
      ...billingAddress,
      boughtProductInfo: buyingProduct.map(x => {
        return {
          productId: x.productId,
          productName: x.productName,
          selectedVariant: x.selectedVariant,
          subInfo: x?.subInfo || null,
          quantity: x?.quantity || null,
          price: x?.price || null,
          discount: x?.discount || null,
        }
      }),
      totalPayableAmount: calculateOrderTotal()
    })
    router.push("/place-your-order/checkout")
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    if (name === "name") {
      setBillingAddress({...billingAddress, [name]: value});
    }
    else if (name === "phoneNo" && value.length <= 10) {
      setBillingAddress({...billingAddress, [name]: value.replace(/[^0-9]/g, "")});
    }
    else {
      const updatedAddress = {...billingAddress.address, [name]: value};
      setBillingAddress((prevState) => ({
        ...prevState,
        address: updatedAddress,
      }));
    }
  };
  useEffect(() => {
    console.log(buyingProduct)
  }, [])
  const calculateSubtotal = () => {
    let subtotal = 0;
    productSummary.forEach((product) => {
      if (product.price) {
        subtotal += parseInt(product.price - (product.price / 100) * product.discount) * product.selectedVariant.quantity;
      } else {
        subtotal += parseInt(product.subInfo.price - (product.subInfo.price / 100) * product.subInfo.discount) * product.selectedVariant.quantity;
      }
    });
    return subtotal;
  };

  const calculateOrderTotal = () => {
    let total = 0;
    total = calculateSubtotal() + delivery_charges;
    return total;
  };

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 7);

  return (
    <>
      {buyingProduct.length ?
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
                  id="phoneNo"
                  name="phoneNo"
                  value={billingAddress.phoneNo}
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
                    <Image src={product.productFirtsImgURL} width={500} height={500} alt={product.name} />
                    <div>
                      <p>{product.productName}</p>
                      {Object.keys(product.selectedVariant.variant).sort().map(key => <p key={key} > {key} : {product.selectedVariant.variant[key]}</p>)}
                      <p>Price: ₹{product.price ? parseInt(product.price - (product.price / 100 * product.discount)).toLocaleString("en-IN", {useGrouping: true}) : parseInt(product.subInfo?.price - (product.subInfo?.price / 100) * product.subInfo?.discount).toLocaleString("en-IN", {useGrouping: true})}</p>
                      <p> Quantity : {product.selectedVariant.quantity} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.amount_date}>
              <h3>Total Amount</h3>
              <p>Delivery Charges: ₹{delivery_charges}</p>
              <p>
                Subtotal({productSummary.length > 1 ? productSummary.reduce((item1, item2) => item1.selectedVariant.quantity + item2.selectedVariant.quantity) : productSummary[0].selectedVariant.quantity} items): ₹{calculateSubtotal().toLocaleString("en-IN", {useGrouping: true})}
              </p>
              <p>Total: ₹{calculateOrderTotal().toLocaleString("en-IN", {useGrouping: true})}</p>
              <h3>Estimated Delivery Date</h3>
              <p>{estimatedDate.toLocaleDateString()}</p>
              <button type="submit" className={styles.action_proceed}>
                Place Order
              </button>
            </div>
          </form>
        </div>
        : router.replace("/cart")
      }
    </>

  );
};

export default Page;
