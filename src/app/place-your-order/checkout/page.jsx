"use client"
import { useState } from 'react';
import styles from '@/Styles/Checkout.module.css';
import Image from 'next/image';

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isUpiIdVerified, setIsUpiIdVerified] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
  };

  const handleUpiIdVerification = () => {
    const isVerified = true; // Replace with your UPI ID verification logic
    setIsUpiIdVerified(isVerified);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the payment submission based on the selected payment method and upiId
  };

  return (
    <div className={styles.checkout_page}>
      <form onSubmit={handlePaymentSubmit} className={styles.payment_form}>
        <div className={styles.payment_methods}>
          <h3>Payment Options</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="googlePay"
              checked={selectedPaymentMethod === 'googlePay'}
              onChange={() => handlePaymentMethodChange('googlePay')}
            />
            <span> <Image src={"/googlePay.png"} width={30} height={30} alt='Google Pay'/> </span>
            Google Pay
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="phonePe"
              checked={selectedPaymentMethod === 'phonePe'}
              onChange={() => handlePaymentMethodChange('phonePe')}
            />
            <span> <Image src={"/phonePe.png"} width={30} height={30} alt='PhonePe'/> </span>
            PhonePe
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="paytm"
              checked={selectedPaymentMethod === 'paytm'}
              onChange={() => handlePaymentMethodChange('paytm')}
            />
            <span> <Image src={"/paytm.png"} width={30} height={30} alt='PayTM'/> </span>
            Paytm
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="upiId"
              checked={selectedPaymentMethod === 'upiId'}
              onChange={() => handlePaymentMethodChange('upiId')}
            />
            <span> <Image src={"/upi.png"} width={30} height={30} alt='UPI ID'/> </span>
            UPI ID
            {selectedPaymentMethod === 'upiId' && (
              <>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={upiId}
                  className={styles.upi_id_section}
                  placeholder="upi id"
                  spellCheck="false"
                  onChange={handleUpiIdChange}
                  required
                />
                <button
                  className={styles.verify_upi}
                  onClick={handleUpiIdVerification}
                >
                  Verify
                </button>
              </>
            )}
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={selectedPaymentMethod === 'cashOnDelivery'}
              onChange={() => handlePaymentMethodChange('cashOnDelivery')}
            />
            <span> <Image src={"/cod.png"} width={30} height={30} alt='Cash on Delivery'/> </span>
            Cash on Delivery
          </label>
        </div>
        <center>
          <button
            type="submit"
            className={styles.submit_option}
            disabled={!selectedPaymentMethod || (selectedPaymentMethod === 'upiId' && !isUpiIdVerified)}
          >
            Continue
          </button>
        </center>
      </form>
    </div>
  );
};

export default CheckoutPage;
