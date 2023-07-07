"use client"
import AccountSidebar from '@/Components/AccountSidebar';
import styles from "@/Styles/Account.module.css"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const page = () => {

    return (<>

        <h3>Personal Information</h3>
        <div className={styles.user_account}>
            <div className={styles.user_info}>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Email:</strong> johndoe@example.com</p>
                <p><strong>Phone:</strong> +1 123_456_7890</p>
                <p><strong>Address:</strong> 123 Main St, City, State, ZIP</p>
            </div>
        </div>
            <h3>Recent Order</h3>
        <div className={styles.user_account} >
            <div className={styles.recent_order}>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Link href={"#"} > #123456 </Link></td>
                            <td>Nothing Phone (2)</td>
                            <td>June 10, 2023</td>
                            <td>$99.99</td>
                        </tr>
                        <tr>
                            <td><Link href={"#"} > #123456 </Link></td>
                            <td>Nothing Phone (2)</td>
                            <td>June 1, 2023</td>
                            <td>$99.99</td>
                        </tr>
                        <tr>
                            <td><Link href={"#"} > #123456 </Link></td>
                            <td>Nothing Phone (2)</td>
                            <td>MAy 20, 2023</td>
                            <td>$99.99</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </>
    );
};

export default page;
