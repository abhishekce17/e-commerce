"use client"
import React, { useState } from 'react';
import styles from "@/Styles/SpecialDealsManagment.module.css";
import { RiSearch2Line } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';

const SpecialDeals = () => {
  const [startDeals, setStartDeals] = useState(true)
  const [bannerImages, setBannerImages] = useState([{ image: null, text: '' }]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectAll, setSelectAll] = useState(false); // New state variable for overall selection

  const handleStartDeals = () => {
    setStartDeals(!startDeals)
  }

  const handleBannerImageUpload = (event, index, imageType) => {
    const file = event.target.files[0];
    const updatedBannerImages = [...bannerImages];
    if (imageType === 'pc') {
      updatedBannerImages[index].pcImage = file;
    } else if (imageType === 'mobile') {
      updatedBannerImages[index].mobileImage = file;
    }
    setBannerImages(updatedBannerImages);
  };

  const handleBannerImageTextChange = (event, index, imageType) => {
    const text = event.target.value;
    const updatedBannerImages = [...bannerImages];
    if (imageType === 'pc') {
      updatedBannerImages[index].text = text;
    } else if (imageType === 'mobile') {
      updatedBannerImages[index].mobileText = text;
    }
    setBannerImages(updatedBannerImages);
  };

  const handleAddBannerImage = () => {
    setBannerImages([...bannerImages, { pcImage: null, pcText: '', mobileImage: null, mobileText: '' }]);
  };

  const handleRemoveBannerImage = (index) => {
    const updatedBannerImages = [...bannerImages];
    updatedBannerImages.splice(index, 1);
    setBannerImages(updatedBannerImages);
  };

  const handleProductToggle = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      const allProductIds = productList.map((product) => product.id);
      setSelectedProducts(allProductIds);
    }
    setSelectAll(!selectAll);
  };

  const handleDiscountPercentageChange = (event) => {
    const percentage = parseInt(event.target.value);
    setDiscountPercentage(percentage);
  };

  const calculateFinalValue = (price, discountPercentage) => {
    const discountAmount = (price * discountPercentage) / 100;
    const finalValue = price - discountAmount;
    return finalValue.toFixed(2); // Adjust the decimal places as needed
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submit logic here
  };

  const productList = [
    { id: 1, name: 'Product 1', category: 'Mobiles', stock: 2250, price: 1522 },
    { id: 2, name: 'Product 2', category: 'Mobiles', stock: 2250, price: 1522 },
    { id: 3, name: 'Product 3', category: 'Mobiles', stock: 2250, price: 1522 },
    // Add more products as needed
  ];

  return (
    <div>
      <h1>Special Deals</h1>
      <button onClick={handleStartDeals} >Click</button>
      {
        startDeals &&
        <form onSubmit={handleSubmit}>
          <div>
            {bannerImages.map((banner, index) => (
              <div key={index}>
                <label htmlFor={`pcImage-${index}`}>Banner Image (PC View):</label>
                <input
                  type="file"
                  id={`pcImage-${index}`}
                  accept="image/*"
                  onChange={(event) => handleBannerImageUpload(event, index, 'pc')}
                />
                <input
                  type='text'
                  placeholder='Search by ID or name or product page link'
                  value={banner.pcText}
                  onChange={(event) => handleBannerImageTextChange(event, index, 'pc')}
                />

                <label htmlFor={`mobileImage-${index}`}>Banner Image (Mobile View):</label>
                <input
                  type="file"
                  id={`mobileImage-${index}`}
                  accept="image/*"
                  onChange={(event) => handleBannerImageUpload(event, index, 'mobile')}
                />
                <input
                  type='text'
                  placeholder='Search by ID or name or product page link'
                  value={banner.mobileText}
                  onChange={(event) => handleBannerImageTextChange(event, index, 'mobile')}
                />

                <button type="button" onClick={() => handleRemoveBannerImage(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddBannerImage}>
              Add Banner Image
            </button>
          </div>

          <div>
            <h3>Select Products:</h3>
            <div className={styles.view_products}>
              <div className={styles.top_bar}>
                <div>
                  <RiSearch2Line style={{ position: "relative", top: "4px" }} />
                  <input type='text' placeholder='Search Product' />
                </div>
              </div>
              <div className={styles.headings}>
                <input type='checkbox' checked={selectAll} onChange={handleSelectAllToggle} />
                <div>Product</div>
                <div>Category</div>
                <div>Stock</div>
                <div>Price</div>
                <div>Discount</div>
                <div>Final Price</div>
              </div>
              {productList.map((product) => (
                <div key={product.id} className={styles.product_info}>
                  <input
                    type='checkbox'
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductToggle(product.id)}
                  />
                  <div>
                    <Image src={"/category.jpg"} width={100} height={100} alt='name' />
                    <Link href={`/administrator/admin/product-managment/product-details/${product.id}`}>
                      <p>{product.name}</p>
                    </Link>
                  </div>
                  <div>{product.category}</div>
                  <div>{product.stock}</div>
                  <div>${product.price}</div>
                  <div>
                    <input
                      type='text'
                      value={discountPercentage}
                      onChange={handleDiscountPercentageChange}
                      placeholder='Discount in percentage'
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      value={calculateFinalValue(product.price, discountPercentage)}
                      placeholder='Final value'
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit">Save</button>
        </form>
      }
    </div>
  );
};

export default SpecialDeals;
