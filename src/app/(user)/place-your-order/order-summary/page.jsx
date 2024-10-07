'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { OutlineButton } from '@/Components/OutlineButton';
import { PrimaryButton } from '@/Components/PrimaryButton';
import { setBuyingProduct } from '@/features/user-details/buyingProductSlice';
import { fetchCartProducts } from '@/actions/fetchCartProducts';
import Loading from '../../loading';
import { confirmOrder } from '@/actions/confirmOrder';
import { notify } from '@/utils/notify';

const Page = () => {
  const dispatch = useDispatch();
  const buyingProduct = useSelector(state => state.buyingProduct);
  const Personal = useSelector(state => state.userData.userData.Personal);
  const [paymentMethod, setPaymentMethod] = useState("");
  let delivery_charges = 79;
  const [billingAddress, setBillingAddress] = useState({ ...Personal, name: Personal.fullName, ...Personal.contact });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [disabled, setDisableBtn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const setBuyinProductOnRefresh = async () => {
      const response = await fetchCartProducts()
      dispatch(setBuyingProduct(response.Cart));
    }
    if (!buyingProduct[0].quantity) {
      setBuyinProductOnRefresh();
    }
  }, [buyingProduct]);

  const validateForm = () => {
    let formErrors = {};
    if (!billingAddress.name) formErrors.name = "Name is required";
    if (!billingAddress.phoneNo) formErrors.phoneNo = "Phone number is required";
    if (!billingAddress.address.house_no) formErrors.house_no = "House number is required";
    if (!billingAddress.address.area) formErrors.area = "Area is required";
    if (!billingAddress.address.city) formErrors.city = "City is required";
    if (!billingAddress.address.state) formErrors.state = "State is required";
    if (!billingAddress.address.pincode) formErrors.pincode = "Pincode is required";
    if (!paymentMethod) formErrors.paymentMethod = "Payment method is required";
    return formErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    notify("do not refresh or go back", "loading")
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // Proceed with form submission
    console.log("Form submitted:", billingAddress);
    const response = await confirmOrder({ buyingProductDetails: buyingProduct, paymentMethod: paymentMethod, price: calculateOrderTotal() });
    if (response.status !== 200) {
      notify(response.message, "error");
    } else {
      notify(response.message, "success");
      router.replace("/account/order-history")
    }
    setDisableBtn(false);
    // Add your form submission logic here
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setBillingAddress({ ...billingAddress, [name]: value });
    }
    else if (name === "phoneNo" && value.length <= 10) {
      setBillingAddress({ ...billingAddress, [name]: value.replace(/[^0-9]/g, "") });
    }
    else {
      const updatedAddress = { ...billingAddress.address, [name]: value };
      setBillingAddress((prevState) => ({
        ...prevState,
        address: updatedAddress,
      }));
    }
    // Clear the error when the user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    buyingProduct.forEach((product) => {
      subtotal += parseInt(product.price - (product.price / 100) * product.discount) * product.quantity;
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
      {buyingProduct[0].quantity > 0 ?
        <form onSubmit={handleFormSubmit} className="flex flex-col lg:flex-row relative gap-7 leading-7 lg:mx-14">
          <div className="rounded bg-white p-3 grow flex flex-col" >
            <h3>Billing Information</h3>
            <div className="lg:grid grid-cols-2 gap-4 p-2">
              <div className="flex flex-col" >
                <label className="font-bold" htmlFor="name">Name:</label>
                <input
                  required
                  className="text-xl outline-none shadow-none border-b border-primary-light mb-3"
                  type="text"
                  id="name"
                  name="name"
                  value={billingAddress.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
              </div>
              <div className="flex flex-col" >
                <label className="font-bold" htmlFor="phone">Phone:</label>
                <input
                  required
                  className="text-xl outline-none shadow-none border-b border-primary-light mb-3"
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  value={billingAddress.phoneNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.phoneNo && <span className="text-red-500">{errors.phoneNo}</span>}
              </div>
            </div>
            <div className="flex flex-col p-2" >
              <label className="font-bold" htmlFor="address">Address:</label>
              <div className="flex flex-col">
                <label htmlFor="address">Flat, House no., Building, Company, Apartment:</label>
                <input
                  required
                  className="text-xl outline-none shadow-none border-b border-primary-light mb-3"
                  type="text"
                  id="house_no"
                  name="house_no"
                  value={billingAddress.address.house_no}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.house_no && <span className="text-red-500">{errors.house_no}</span>}
                <label htmlFor="address">Area, Locality:</label>
                <input
                  required
                  className="text-xl outline-none shadow-none border-b border-primary-light mb-3"
                  type="text"
                  id="area"
                  name="area"
                  value={billingAddress.address.area}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.area && <span className="text-red-500">{errors.area}</span>}
                <label htmlFor="address">Landmark:</label>
                <input
                  className="text-xl outline-none shadow-none border-b border-primary-light mb-3"
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={billingAddress.address.landmark}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <label htmlFor="address">City:</label>
                <input
                  required
                  className="text-xl outline-none shadow-none border-b border-primary-light mb-3"
                  type="text"
                  id="city"
                  name="city"
                  value={billingAddress.address.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.city && <span className="text-red-500">{errors.city}</span>}
                <label htmlFor="address">State:</label>
                <input
                  required
                  className="text-xl outline-none shadow-none border-b border-primary-light mb-3"
                  type="text"
                  id="state"
                  name="state"
                  value={billingAddress.address.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.state && <span className="text-red-500">{errors.state}</span>}
                <label htmlFor="address">Pincode:</label>
                <input
                  required
                  className="text-xl outline-none shadow-none border-b border-primary-light mb-3"
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={billingAddress.address.pincode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.pincode && <span className="text-red-500">{errors.pincode}</span>}
              </div>
            </div>
            <OutlineButton disabled={disabled} label={isEditing ? "Save" : "Edit"} onClick={isEditing ? handleSaveClick : handleEditClick} className="rounded-md text-base" />
            <div className="font-medium mt-3 ">
              <h3>Products</h3>
              {buyingProduct.map((product, index) => (
                <div key={`${product.productId} ${index}`} className="flex gap-4 items-center py-2 border-b border-primary-light last:border-none">
                  <Image className="max-w-52" src={product.productFirtsImgURL} width={500} height={500} alt={product.name} />
                  <div>
                    <p>{product.productName}</p>
                    {Object.keys(product.variant).sort().map(key => <p key={key} > {key} : {product.variant[key]}</p>)}
                    <p>Price: ₹{product.price ? parseInt(product.price - (product.price / 100 * product.discount)).toLocaleString("en-IN", { useGrouping: true }) : parseInt(product.subInfo?.price - (product.subInfo?.price / 100) * product.subInfo?.discount).toLocaleString("en-IN", { useGrouping: true })}</p>
                    <p> Quantity : {product.quantity} </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-md p-6 bg-white h-max text-lg sticky top-24 leading-8">
            <h3>Total Amount</h3>
            <p>Delivery Charges: ₹{delivery_charges}</p>
            <p>
              Subtotal({buyingProduct.length > 1 ? buyingProduct.reduce((item1, item2) => item1.quantity + item2.quantity) : buyingProduct[0].quantity} items): ₹{calculateSubtotal().toLocaleString("en-IN", { useGrouping: true })}
            </p>
            <p>Total: ₹{calculateOrderTotal().toLocaleString("en-IN", { useGrouping: true })}</p>
            <h3>Estimated Delivery Date</h3>
            <p>{estimatedDate.toLocaleDateString()}</p>
            <div className="flex flex-col space-y-4 py-4 text-base">
              <label className="flex items-center cursor-pointer">
                <input
                  required
                  type="radio"
                  name="paymentMethod"
                  value="UPI/GPay/Paytm/PhonePe/Cards"
                  className="sr-only peer"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="w-4 h-4 border border-gray-300 rounded-full peer-checked:border-primary peer-checked:bg-primary-light flex-shrink-0"></span>
                <span className="font-medium text-gray-900 ml-2">UPI/GPay/Paytm/PhonePe/Cards</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  required
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  className="sr-only peer"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="w-4 h-4 border border-gray-300 rounded-full peer-checked:border-primary  peer-checked:bg-primary-light flex-shrink-0"></span>
                <span className="font-medium text-gray-900 ml-2">COD</span>
              </label>
            </div>
            {errors.paymentMethod && <span className="text-red-500">{errors.paymentMethod}</span>}
            <PrimaryButton disabled={disabled} type="submit" label="Place Order" className="w-full" />
          </div>
        </form>
        : <Loading />
      }
    </>
  );
};

export default Page;