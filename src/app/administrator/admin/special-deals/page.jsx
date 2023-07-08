"use client"
import React, { useState } from 'react';
import styles from '@/Styles/SpecialDealsManagment.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { IoIosImages } from 'react-icons/io';

const SpecialDeals = () => {
  const [startDeals, setStartDeals] = useState(true);
  const [searchSaleProduct, setSearchSaleProduct] = useState("")
  const [bannerImages, setBannerImages] = useState([{ pcImage: null, mobileImage: null, product: {} }]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  // const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bannerProduct, setBannerProduct] = useState("")
  const [selectAll, setSelectAll] = useState(false);

  const handleStartDeals = () => {
    setBannerImages([{ pcImage: null, mobileImage: null, product: {} }])
    setSelectedProducts([])
    setStartDeals(!startDeals);
  };

  const handleBannerImageUpload = (event, index, imageType) => {
    const file = event.target.files[0];
    const updatedBannerImages = [...bannerImages];
    if (imageType === 'pc') {
      updatedBannerImages[index].pcImage = file;
      updatedBannerImages[index].pcImageUrl = URL.createObjectURL(file);
    } else if (imageType === 'mobile') {
      updatedBannerImages[index].mobileImage = file;
      updatedBannerImages[index].mobileImageUrl = URL.createObjectURL(file);
    }
    setBannerImages(updatedBannerImages);
  };


  const handleAddBannerImage = () => {
    setBannerImages([...bannerImages, { pcImage: null, pcText: '', product: {} }]);
  };

  const handleBannerProduct = (productId, index) => {
    const selectedProduct = BannerProductList.find((product) => product.id === productId);
    setBannerImages((prevBannerImages) => {
      const updatedBannerImages = [...prevBannerImages];
      const bannerProduct = updatedBannerImages[index].product;
      if (bannerProduct && bannerProduct.id === productId) {
        updatedBannerImages[index].product = {};
      } else {
        updatedBannerImages[index].product = selectedProduct;
      }
      return updatedBannerImages;
    });
    setBannerProduct("")
  };


  const handleRemoveBannerImage = (index) => {
    const updatedBannerImages = [...bannerImages];
    updatedBannerImages.splice(index, 1);
    setBannerImages(updatedBannerImages);
  };

  const handleProductToggle = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      const selectedProduct = productList.find((product) => product.id === productId);
      if (prevSelectedProducts.find((product) => product.id === productId) !== undefined) {
        return prevSelectedProducts.filter((product) => product.id !== productId);
      } else {
        return [...prevSelectedProducts, selectedProduct];
      }
    });
  };


  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(productList);
    }
    setSelectAll(!selectAll);
  };


  const calculateFinalValue = (price, discountPercentage) => {
    const discountAmount = (price * discountPercentage) / 100;
    const finalValue = price - discountAmount;
    return finalValue.toFixed(2);
  };

  const handleProductDiscountChange = (event, productId, index) => {
    const { name, value } = event.target;
    const percentage = parseInt(value);
    if (name !== "bannerProduct") {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.map((product) =>
          product.id === productId ? { ...product, discount: percentage, netValue: calculateFinalValue(product.price, percentage) } : product
        )
      );
    }
    else {
      setBannerImages((prevBannerImages) => {
        const updatedBannerImages = [...prevBannerImages];
        console.log(updatedBannerImages)
        console.log(index)
        updatedBannerImages[index].product.discount = percentage;
        updatedBannerImages[index].product.netValue = calculateFinalValue(updatedBannerImages[index].product.price, percentage);
        return updatedBannerImages;
      })
    };
  }

  const handleSearchProduct = (e) => {
    const { name, value } = e.target
    if (name === "bannerProduct") {
      setBannerProduct(value)
    }
    if (name === "saleProducts") {
      setSearchSaleProduct(value)
    }
  }

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

  const BannerProductList = [
    { id: 1, name: 'Product 1', category: 'Mobiles', stock: 2250, price: 1522 },
    { id: 2, name: 'Product 2', category: 'Mobiles', stock: 2250, price: 1522 },
    { id: 3, name: 'Product 3', category: 'Mobiles', stock: 2250, price: 1522 },
    // Add more products as needed
  ];

  const handleDrop = (event, index, imageType) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const updatedBannerImages = [...bannerImages];
    if (imageType === 'pc') {
      updatedBannerImages[index].pcImage = file;
      updatedBannerImages[index].pcImageUrl = URL.createObjectURL(file);
    } else if (imageType === 'mobile') {
      updatedBannerImages[index].mobileImage = file;
      updatedBannerImages[index].mobileImageUrl = URL.createObjectURL(file);
    }
    setBannerImages(updatedBannerImages);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.SpecialDeals_page} >
      <div className={styles.activate_deals_option} >
        Add Special Deals Products
        <button className={startDeals && styles.activated} onClick={handleStartDeals}></button>
      </div>
      {startDeals && (
        <form onSubmit={handleSubmit}>
          <div className={styles.select_banner_images} >
            <div className={styles.image_preview}>
              {bannerImages.map((banner, index) => (
                <div key={`image-${index}`} >
                  <div className={styles.laptop_view_image} >
                    {banner.pcImageUrl && (
                      <div className={styles.image_container}>
                        <Image
                          src={banner.pcImageUrl}
                          alt={`Product ${index}`}
                          width={1000}
                          height={1000}
                          className={styles.laptop_view_image}
                        />
                      </div>
                    )}
                    {!banner.pcImageUrl && (
                      <label className={styles.product_images}>

                        <div
                          className={styles.image_drop_area}
                          onDrop={(event) => handleDrop(event, index, 'pc')}
                          onDragOver={handleDragOver}
                        >
                          <IoIosImages style={{ fontSize: '2.5rem' }} />
                          Drag and Drop or click to add <strong> Laptop view images </strong>
                          <input
                            type="file"
                            id={`pcImage-${index}`}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleBannerImageUpload(event, index, 'pc')}
                          />
                        </div>
                      </label>
                    )}
                  </div>
                  <div className={styles.mobile_view_image} >
                    {banner.mobileImageUrl && (
                      <div className={styles.image_container}>
                        <Image
                          src={banner.mobileImageUrl}
                          alt={`Product ${index}`}
                          width={1000}
                          height={1000}
                          className={styles.mobile_view_image}
                        />
                      </div>
                    )}
                    {!banner.mobileImageUrl && (
                      <label className={styles.product_images}>
                        <div
                          className={styles.image_drop_area}
                          onDrop={(event) => handleDrop(event, index, 'mobile')}
                          onDragOver={handleDragOver}
                        >
                          <IoIosImages style={{ fontSize: '2.5rem' }} />
                          Drag and Drop or click to add <strong> Mobile view images </strong>
                          <input
                            type="file"
                            id={`mobileImage-${index}`}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleBannerImageUpload(event, index, 'mobile')}
                          />
                        </div>
                      </label>
                    )}
                  </div>
                  {banner.product.id !== undefined &&
                    <div className={`${styles.view_products} ${styles.select_banner_product}`}>
                      <h3>Banner Product</h3>
                      <div className={styles.headings}>
                        <div style={{ gridColumn: "1 / span 2" }} >Product</div>
                        <div>Category</div>
                        <div>Stock</div>
                        <div>Price</div>
                        <div>Discount</div>
                        <div>Final Price</div>
                      </div>
                      {/* {selectedProducts.map((product) => ( */}
                      <div key={banner.product.id} className={styles.product_info}>
                        <input
                          type="checkbox"
                          checked
                          // checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                          onChange={() => handleBannerProduct(banner.product.id, index)}
                        />
                        <div>
                          <Image src={'/category.jpg'} width={100} height={100} alt="name" />
                          <Link href={`/administrator/admin/product-managment/product-details/${banner.product.id}`}>
                            <p>{banner.product.name}</p>
                          </Link>
                        </div>
                        <div>{banner.product.category}</div>
                        <div>{banner.product.stock}</div>
                        <div>${banner.product.price}</div>
                        <>
                          <div className={styles.deals_input}>
                            <input
                              type="text"
                              placeholder="Discount"
                              name='bannerProduct'
                              value={banner.product.discount || ""}
                              onChange={(event) => handleProductDiscountChange(event, banner.product.id, index)}
                            />
                          </div>
                          <div className={styles.deals_input}>
                            <input
                              type="text"
                              placeholder="Net Value"
                              disabled
                              value={banner.product.netValue || ""}
                            // onChange={(event) => handleProductNetValueChange(event, product.id)}
                            />
                          </div>
                        </>
                      </div>
                      {/* ))} */}




                    </div>
                  }
                  {banner.product.id === undefined &&
                    <div className={styles.banner_product} >
                      <RiSearchLine style={{ position: 'relative', top: '4px' }} />
                      <input type='text' name='bannerProduct' value={bannerProduct} onChange={handleSearchProduct} placeholder='Search banner product, by name, product id or page link' />
                    </div>
                  }
                  <button type="button" onClick={() => handleRemoveBannerImage(index)}>
                    Remove
                  </button>

                  {bannerProduct.length > 0 && banner.product.id === undefined &&
                    <div className={`${styles.view_products} ${styles.not_selected} ${styles.select_banner_product}`}>
                      <div className={styles.headings}>
                        <div style={{ gridColumn: "1 / span 2" }} >Product</div>
                        <div>Category</div>
                        <div>Stock</div>
                        <div>Price</div>
                      </div>
                      {BannerProductList.map((product) => (
                        <div key={product.id} className={styles.product_info}>
                          <input
                            type="checkbox"
                            checked={bannerImages.find((selected) => selected.product.id === product.id) !== undefined}
                            // checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                            onChange={() => handleBannerProduct(product.id, index)}
                          />
                          <div>
                            <Image src={'/category.jpg'} width={100} height={100} alt="name" />
                            <Link href={`/administrator/admin/product-managment/product-details/${product.id}`}>
                              <p>{product.name}</p>
                            </Link>
                          </div>
                          <div>{product.category}</div>
                          <div>{product.stock}</div>
                          <div>${product.price}</div>
                          {/* <>
                          <div className={styles.deals_input}>
                            <input
                              type="text"
                              placeholder="Discount"
                              value={product.discount || ""}
                              onChange={(event) => handleProductDiscountChange(event, product.id)}
                            />
                          </div>
                          <div className={styles.deals_input}>
                            <input
                              type="text"
                              placeholder="Net Value"
                              disabled
                              value={product.netValue || ""}
                            // onChange={(event) => handleProductNetValueChange(event, product.id)}
                            />
                          </div>
                        </> */}
                        </div>
                      ))}




                    </div>
                  }



                </div>
              ))}
              <button type="button" style={{ gridColumn: "1", marginTop: "20px" }} onClick={handleAddBannerImage}>
                Add Banner Image
              </button>

            </div>
          </div>

          {selectedProducts.length > 0 &&
            <>
              <h3>Selected Products</h3>
              <div className={`${styles.view_products} `}>
                <div className={styles.headings}>
                  <div style={{ gridColumn: "1 / span 2" }} >Product</div>
                  <div>Category</div>
                  <div>Stock</div>
                  <div>Price</div>
                  <div>Discount</div>
                  <div>Final Price</div>
                </div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className={styles.product_info}>
                    <input
                      type="checkbox"
                      checked
                      // checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                      onChange={() => handleProductToggle(product.id)}
                    />
                    <div>
                      <Image src={'/category.jpg'} width={100} height={100} alt="name" />
                      <Link href={`/administrator/admin/product-managment/product-details/${product.id}`}>
                        <p>{product.name}</p>
                      </Link>
                    </div>
                    <div>{product.category}</div>
                    <div>{product.stock}</div>
                    <div>${product.price}</div>
                    <>
                      <div className={styles.deals_input}>
                        <input
                          type="text"
                          placeholder="Discount"
                          value={product.discount || ""}
                          onChange={(event) => handleProductDiscountChange(event, product.id)}
                        />
                      </div>
                      <div className={styles.deals_input}>
                        <input
                          type="text"
                          placeholder="Net Value"
                          disabled
                          value={product.netValue || ""}
                        // onChange={(event) => handleProductNetValueChange(event, product.id)}
                        />
                      </div>
                    </>
                  </div>
                ))}




              </div>
            </>
          }

          <div>
            <h3>Select Products:</h3>
            <div className={`${styles.view_products} ${styles.not_selected}`}>
              <div className={styles.top_bar}>
                <div style={{ marginBottom: "20px" }} >
                  <RiSearchLine style={{ position: 'relative', top: '4px' }} />
                  <input type="text" value={searchSaleProduct} name="saleProducts" onChange={handleSearchProduct} placeholder="Search Product" />
                </div>
              </div>
              {searchSaleProduct.length > 0 &&
                <>
                  <div className={styles.headings}>
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAllToggle} />
                    <div>Product</div>
                    <div>Category</div>
                    <div>Stock</div>
                    <div>Price</div>
                  </div>
                  {productList.map((product, index) => (
                    <div key={product.id} className={styles.product_info}>
                      <input
                        type="checkbox"
                        checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                        onChange={() => handleProductToggle(product.id)}
                      />
                      <div>
                        <Image src={'/category.jpg'} width={100} height={100} alt="name" />
                        <Link href={`/administrator/admin/product-managment/product-details/${product.id}`}>
                          <p>{product.name}</p>
                        </Link>
                      </div>
                      <div>{product.category}</div>
                      <div>{product.stock}</div>
                      <div>${product.price}</div>
                      {/* {selectedProducts.find((selected) => selected.id === product.id) !== undefined && (
                        <>
                          <div className={styles.deals_input}>
                            <input
                              type="text"
                              placeholder="Discount"
                              value={selectedProducts.find((selected) => selected.id === product.id).discount || ""}
                              onChange={(event) => handleProductDiscountChange(event, product.id)}
                            />
                          </div>
                          <div className={styles.deals_input}>
                            <input
                              type="text"
                              placeholder="Net Value"
                              disabled
                              value={selectedProducts.find((selected) => selected.id === product.id).netValue || ""}
                            // onChange={(event) => handleProductNetValueChange(event, product.id)}
                            />
                          </div>
                        </>
                      )} */}
                    </div>
                  ))}
                </>
              }
            </div>
          </div>
          <center>
            <button type="submit" style={{ width: "150px", fontWeight: "600" }}>Save</button>
          </center>
        </form>
      )}
    </div>
  );
};

export default SpecialDeals;
