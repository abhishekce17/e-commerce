"use client"
import React, { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import styles from '@/Styles/OrderManagment.module.css'; // Assuming you have a CSS module file

const OrderManagmentTopbar = () => {
  const [selectedOption, setSelectedOption] = useState('All orders');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(option);
  };

  return (
    <div className={styles.upper_top_bar}>
      <div
        className={`${styles.option} ${selectedOption === 'All orders' && styles.selected}`}
        onClick={() => handleOptionClick('All orders')}
      >
        All Orders
      </div>
      <div
        className={`${styles.option} ${selectedOption === 'Completed' && styles.selected}`}
        onClick={() => handleOptionClick('Completed')}
      >
        Completed
      </div>
      <div
        className={`${styles.option} ${selectedOption === 'Pending' && styles.selected}`}
        onClick={() => handleOptionClick('Pending')}
      >
        Pending
      </div>
      <div
        className={`${styles.option} ${selectedOption === 'In Process' && styles.selected}`}
        onClick={() => handleOptionClick('In Process')}
      >
        In Process
      </div>
      <div
        className={`${styles.option} ${selectedOption === 'Cancelled' && styles.selected}`}
        onClick={() => handleOptionClick('Cancelled')}
      >
        Cancelled
      </div>
    </div>
  );
};

export default OrderManagmentTopbar;
