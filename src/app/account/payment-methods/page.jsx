import React from "react"
import { FaGooglePay, FaPhone, FaMoneyCheckAlt } from "react - icons / fa";
import { SiPaytm } from "react-icons/si"
import styles from "@/Styles/paymentMethods.module.css"

const page = () => {
    return (<>
        <h2>Accepted Payment Methods</h2>
        <div className={styles.payment_methods}>
            <ol>
                <li>
                    <FaGooglePay className={styles.payment_method_icon} />
                    <span>Google Pay:</span>
                    <p>
                        Select Google Pay when you want to pay. Follow the instructions from Google Pay to complete your payment.
                        Google Pay keeps your payment information safe.
                    </p>
                </li>

                <li>
                    <FaPhone className={styles.payment_method_icon} />
                    <span>PhonePe:</span>
                    <p>
                        Choose PhonePe when you&apos;re ready to pay. You&apos;ll be taken to the PhonePe app or website. Follow the steps
                        there to finish your payment. PhonePe makes sure your payment is secure.
                    </p>
                </li>

                <li>
                    <SiPaytm className={styles.payment_method_icon} />
                    <span>Paytm:</span>
                    <p>
                        Select Paytm during checkout. You&apos;ll be directed to the Paytm app or website. Follow the instructions to
                        complete your payment. Paytm takes care of your payment details and keeps them safe.
                    </p>
                </li>

                <li>
                    <FaMoneyCheckAlt className={styles.payment_method_icon} />
                    <span>UPI (Unified Payments Interface):</span>
                    <p>
                        Choose UPI when you want to pay. Enter your UPI ID during the checkout process. Follow the instructions
                        from your UPI provider&apos;s app or website. UPI ensures that your payment is safe and protected.
                    </p>
                </li>
            </ol>

            <div className={styles.security_note}>
                <h3>Security Note</h3>
                <p>
                    We take the security of your payment information seriously. All payments made on our website are encrypted,
                    which means they are kept safe. We don&apos;t store any of your sensitive payment details on our servers. So, you
                    can shop with confidence, knowing that your payment information is protected.
                </p>
            </div>
        </div>
    </>
    );
};

export default page;
