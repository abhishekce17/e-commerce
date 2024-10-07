"use client"
import React, { useEffect, useState } from 'react';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { IoIosImages } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/Styles/SpecialDealsManagment.module.css';
import Loading from '../loading';
import { useRouter } from 'next/navigation';
import uploadImages from '../product-managment/uploadImages';
import { notify } from '@/utils/notify';


const SpecialDeals = () => {
  const router = useRouter()
  const [isLoading, SetIsLoading] = useState(true)
  const [searchSaleProduct, setSearchSaleProduct] = useState("");
  const [bannerImages, setBannerImages] = useState([
    { pcImage: null, mobileImage: null, product: {} }
  ]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [bannerProductList, setBannerProductList] = useState([]);
  const [bannerProdcuctQuery, setBannerProdcuctQuery] = useState({ 0: "" })
  const [selectAll, setSelectAll] = useState(false);
  const [removableSelectedProducts, setRemovableSelectedProducts] = useState([])
  const [tempData, setTempData] = useState([]);

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

  function ProdcutInfo() {

  }

  const handleAddBannerImage = () => {
    setBannerProdcuctQuery({ ...bannerProdcuctQuery, [bannerImages.length]: "" })
    setBannerImages([...bannerImages, { pcImage: null, pcText: '', product: {} }]);
  };

  const handleBannerProduct = (productId, index) => {
    const selectedProduct = bannerProductList.find((product) => product.productId === productId);
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
    setBannerProdcuctQuery({ ...bannerProdcuctQuery, [index]: "" })
  };


  const handleRemoveBannerImage = async (index, dealId) => {
    if (dealId !== undefined) {
      console.log("calling remove route")
      const response = await fetch(`/api/AdminDealseSetting/RemoveDeal/${dealId}`, {
        method: "DELETE"
      })
      const result = await response.json()
      if (result?.status == 200) {
        notify("Deal Removed Successfully", "success");
        router.replace("/administrator/admin/dashboard")
      }
    }
    else {
      const updatedBannerImages = [...bannerImages];
      updatedBannerImages.splice(index, 1);
      setBannerImages(updatedBannerImages);
      setBannerProdcuctQuery((prevBannerProductQuery) => {
        const tempData = prevBannerProductQuery
        delete tempData[index]
        return Object.assign({}, Object.values(tempData));
      });
    }
  };


  const handleProductToggle = (productId) => {
    const productToRemove = productList.find(product => product.productId === productId);
    if (productToRemove?.dealProduct && tempData.length) {
      const dealIdToRemove = tempData.find(data => data.productId === productId)?.dealId;

      if (dealIdToRemove) {
        if (removableSelectedProducts.includes(dealIdToRemove)) {
          const updatedRemovableProducts = removableSelectedProducts.filter(dealId => dealId !== dealIdToRemove);
          setRemovableSelectedProducts(updatedRemovableProducts);
        } else {
          setRemovableSelectedProducts(prevRemovableProducts => [
            ...prevRemovableProducts,
            dealIdToRemove
          ]);

        }
      }
    }

    setSelectedProducts((prevSelectedProducts) => {
      const selectedProduct = productList.find((product) => product.productId === productId);
      if (prevSelectedProducts.find((product) => product.productId === productId) !== undefined) {
        return prevSelectedProducts.filter((product) => product.productId !== productId);
      } else {
        return [...prevSelectedProducts, selectedProduct];
      }
    });
    setSearchSaleProduct("")
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

  const handleProductDiscountChange = (event, productId, index, title, variant, variantIndex, typeIndex) => {
    const { name, value } = event.target;
    const percentage = parseInt(value);

    const updateProductWithDiscount = (product, discount, typeIndex) => {
      return {
        ...product,
        discount,
        initialDiscount: product.initialDiscount !== undefined ? product.initialDiscount : product.discount,
        netValue: calculateFinalValue(product.price, discount),
        variants: product.variants.map((varinatProduct, vIndex) => {
          if (vIndex === variantIndex) {
            return {
              ...varinatProduct,
              type: varinatProduct.type.map((variantType, tIndex) =>
                tIndex === typeIndex
                  ? {
                    ...variantType,
                    discount,
                    initialDiscount: variantType.initialDiscount !== undefined ? variantType.initialDiscount : variantType.discount,
                    netValue: calculateFinalValue(variantType.price, discount),
                  }
                  : variantType
              ),
            };
          }
          return varinatProduct;
        }),
      };
    };

    if (name !== "bannerProduct") {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.map((product) =>
          product.productId === productId ? updateProductWithDiscount(product, percentage, typeIndex) : product
        )
      );
    } else {
      setBannerImages((prevBannerImages) => {
        const updatedBannerImages = [...prevBannerImages];
        const bannerProduct = updatedBannerImages[index].product;

        if (bannerProduct.productId !== undefined) {
          updatedBannerImages[index].product = updateProductWithDiscount(bannerProduct, percentage, typeIndex);
        }

        return updatedBannerImages;
      });
    }
  };




  const handleSearchProduct = (e, index) => {
    const { name, value } = e.target
    if (name === "bannerProduct") {
      setBannerProdcuctQuery({ ...bannerProdcuctQuery, [index]: value })
    }
    if (name === "saleProducts") {
      setSearchSaleProduct(value)
    }
  }

  const handleSubmit = async (event) => {
    console.log(removableSelectedProducts)
    event.preventDefault();
    const formDataAPI = new FormData()
    let imgArray = []
    bannerImages.map((product) => {
      (product.mobileImage !== undefined && product.mobileImage !== null) && (imgArray = [{ key: "mobileView", file: product.mobileImage }]);
      (product.pcImage !== undefined && product.pcImage !== null) && (imgArray = [...imgArray, { key: "pcView", file: product.pcImage }]);
    })

    let imgUrlArray = {}
    const imgUploadPromise = new Promise((resolve, reject) => {
      if (!imgArray.length) resolve();
      imgArray.forEach((obj) => {
        const result = uploadImages(obj.file);
        result.then((value) => {
          if (value.status === 500) reject();
          imgUrlArray = { ...imgUrlArray, [obj.key]: value.imgUrl };
          if (Object.keys(imgUrlArray).length === imgArray.length) resolve()
        })
      })
    })
    await imgUploadPromise;
    formDataAPI.append("imgUrls", JSON.stringify(imgUrlArray));
    formDataAPI.append("body", JSON.stringify({ bannerProduct: bannerImages, selectedProducts: selectedProducts }))

    if (selectedProducts.some(x => x.dealId === undefined) || bannerImages.some(y => y.product.productId !== undefined)) {
      const response = await fetch("/api/AdminDealseSetting/AddDealse", {
        method: "POST",
        body: formDataAPI
      })

      const result = await response.json()
      if (result.status === 200) {
        notify("Changes Saved", "success");
        // router.replace("/administrator/admin/special-deals")
      }
      else if (result.status === 500) {
        notify(`Error ${Object.values(result.error)}`, "error");
      }
    }
    if (removableSelectedProducts.length) {
      const encodedArray = encodeURIComponent(JSON.stringify(removableSelectedProducts))
      const dealRemoveResponse = await fetch(`/api/AdminDealseSetting/RemoveDeal/DealIdArray/${encodedArray}`, {
        method: "DELETE"
      })
      const dealRemoveResult = await dealRemoveResponse.json()
      if (dealRemoveResult.status === 200) {
        notify("Successfully removed products from the special deals", "success");
      }
    }

  };

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


  useEffect(() => {
    async function fetchingAllProductsSnap() {
      const res = await fetch(`/api/product-revenue-details`, {
        method: "GET",
      });
      const result = await res.json()
      if (result.status === 200) {
        // console.log(result.data)
        setProductList(result.data)
        setBannerProductList(result.data)
      }
    }


    async function existDeals() {
      const res = await fetch(`/api/AdminDealseSetting/FetchDealse`, {
        method: "GET",
      });
      const result = await res.json()
      if (result.status === 200) {
        setSelectedProducts(result.data.selectedDeals);

        setTempData([
          ...result.data.selectedDeals.map(deal => ({
            productId: deal.productId,
            dealId: deal.dealId
          }))
        ]);
        setBannerImages([
          ...result.data.bannerDeals.map(({ pcViewURL, mobileViewURL, dealId, ...product }) => ({
            pcImageUrl: pcViewURL,
            mobileImageUrl: mobileViewURL,
            dealId: dealId,
            product: product
          }))
        ]);

        // console.log(result.data)
      }
      SetIsLoading(false)
    }
    fetchingAllProductsSnap()
    existDeals()
  }, [])

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.SpecialDeals_page} >
      {isLoading ? Loading()
        :
        <form onSubmit={handleSubmit}>
          <div className={styles.select_banner_images} >
            <div className={styles.image_preview}>
              {bannerImages.map((banner, index) => (
                <div key={`banner-${banner.id}-${index}`} >
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
                  {banner.product.productId !== undefined &&
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

                      {
                        banner.product.variants.length === 0 || banner.product.variants === "" ?
                          <div key={banner.product.productId} className={styles.product_info}>
                            <input
                              type="checkbox"
                              checked
                            // checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                            // onChange={() => handleBannerProduct(banner.product.productId, index)}
                            />
                            <div>
                              <Image src={banner.product.productFirtsImgURL} width={100} height={100} alt="name" />
                              <Link href={`/administrator/admin/product-managment/product-details/${banner.product.productId}`}>
                                <p>{banner.product.productName}</p>
                              </Link>
                            </div>
                            <div>{banner.product.category}</div>
                            <div>{banner.product.stock}</div>
                            <div>{banner.product.price}</div>
                            <>
                              <div className={styles.deals_input}>
                                <input
                                  disabled={banner.dealId !== undefined}
                                  type="text"
                                  placeholder="Discount"
                                  name='bannerProduct'
                                  value={banner.product.discount || ""}
                                  onChange={(event) => handleProductDiscountChange(event, banner.product.productId, index)}
                                />
                              </div>
                              <div className={styles.deals_input}>
                                <input
                                  type="text"
                                  placeholder="Net Value"
                                  disabled
                                  value={calculateFinalValue(banner.product.price, banner.product.discount)}
                                />
                              </div>
                            </>
                          </div>
                          :
                          banner.product.variants.map((productVariant, key1) => {
                            return productVariant.type.map((variantType, key2) => {
                              return (
                                <div key={`product-${banner.product.productId}-${key1}-${key2}`} className={styles.product_info}>
                                  <input
                                    type="checkbox"
                                    checked
                                    // checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                                    onChange={() => handleBannerProduct(banner.product.productId, index)}
                                  />
                                  <div>
                                    <Image src={banner.product.productFirtsImgURL} width={100} height={100} alt="name" />
                                    <Link href={`/administrator/admin/product-managment/product-details/${banner.product.productId}`}>
                                      <p>{banner.product.productName} ({variantType.variant})</p>
                                    </Link>
                                  </div>
                                  <div>{banner.product.category}</div>
                                  <div>{variantType.stock}</div>
                                  <div>{variantType.price}</div>
                                  <>
                                    <div className={styles.deals_input}>
                                      <input
                                        disabled={banner.dealId !== undefined}
                                        type="text"
                                        placeholder="Discount"
                                        name='bannerProduct'
                                        value={variantType.discount || ""}
                                        onChange={(event) => handleProductDiscountChange(event, banner.product.productId, index, productVariant.title, variantType.variant, key1, key2)}
                                      />
                                    </div>
                                    <div className={styles.deals_input}>
                                      <input
                                        type="text"
                                        placeholder="Net Value"
                                        disabled
                                        value={calculateFinalValue(variantType.price, variantType.discount)}
                                      />
                                    </div>
                                  </>
                                </div>
                              )
                            })
                          })
                      }
                    </div>
                  }
                  {banner.product.productId === undefined &&
                    <div className={styles.banner_product} >
                      <RiSearchLine style={{ position: 'relative', top: '4px' }} />
                      <input type='text' name='bannerProduct' value={bannerProdcuctQuery[index]} onChange={(e) => { handleSearchProduct(e, index) }} placeholder='Search banner product, by name, product id or page link' />
                    </div>
                  }
                  <button type="button" onClick={() => handleRemoveBannerImage(index, banner.dealId)}>
                    Remove
                  </button>

                  {bannerProdcuctQuery[index]?.length > 0 && banner.product.productId === undefined &&
                    <div className={`${styles.view_products} ${styles.not_selected} ${styles.select_banner_product}`}>
                      <div className={styles.headings}>
                        <div style={{ gridColumn: "1 / span 2" }} >Product</div>
                        <div>Category</div>
                        <div>Stock</div>
                        <div>Price</div>
                      </div>
                      {bannerProductList.map((product) => (
                        <>
                          {product.variants.length === 0 || product.variants === "" ?
                            <div key={`banner product-${product.productId}`} className={styles.product_info}>
                              <input
                                type="checkbox"
                                checked={bannerImages.find((selected) => selected.product.productId === product.productId) !== undefined}
                                // checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                                onChange={() => handleBannerProduct(product.productId, index)}
                              />
                              <div>
                                <Image src={product.productFirtsImgURL} width={100} height={100} alt="name" />
                                <Link href={`/administrator/admin/product-managment/product-details/${product.productId}`}>
                                  <p>{product.productName}</p>
                                </Link>
                              </div>
                              <div>{product.category}</div>
                              <div>{product.stock}</div>
                              <div>{product.price}</div>
                            </div>
                            :
                            product.variants.map((varinatProduct, key1) => {
                              return varinatProduct.type.map((variantType, key2) => {
                                return (
                                  <div key={[product.productId, key1, key2]} className={styles.product_info}>
                                    <input
                                      type="checkbox"
                                      checked={bannerImages.find((selected) => selected.product.productId === product.productId) !== undefined}
                                      onChange={() => handleBannerProduct(product.productId, index, varinatProduct.title, variantType.variant)}
                                    />
                                    <div>
                                      <Image src={product.productFirtsImgURL} width={100} height={100} alt="name" />
                                      <Link href={`/administrator/admin/product-managment/product-details/${product.productId}`}>
                                        <p>{product.productName} ({variantType.variant})</p>
                                      </Link>
                                    </div>
                                    <div>{product.category}</div>
                                    <div>{variantType.stock}</div>
                                    <div>{calculateFinalValue(variantType.price, variantType.discount)}</div>
                                  </div>
                                )
                              })
                            })
                          }
                        </>
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
                {selectedProducts.map((product) => {
                  return (
                    product.variants.length === 0 || product.variants === "" ?
                      <div key={product.productId} className={styles.product_info}>
                        <input
                          type="checkbox"
                          checked
                          // checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                          onChange={() => handleProductToggle(product.productId)}
                        />
                        <div>
                          <Image src={product.productFirtsImgURL} width={100} height={100} alt="name" />
                          <Link href={`/administrator/admin/product-managment/product-details/${product.productId}`}>
                            <p>{product.productName}</p>
                          </Link>
                        </div>
                        <div>{product.category}</div>
                        <div>{product.stock}</div>
                        <div>{product.price}</div>
                        <>
                          <div className={styles.deals_input}>
                            <input
                              disabled={product.dealId !== undefined || product.dealProduct}
                              type="text"
                              placeholder="Discount"
                              name="saleProduct"
                              value={product.discount || ""}
                              onChange={(event) => handleProductDiscountChange(event, product.productId)}
                            />
                          </div>
                          <div className={styles.deals_input}>
                            <input
                              type="text"
                              placeholder="Net Value"
                              disabled
                              value={calculateFinalValue(product.price, product.discount)}
                            />
                          </div>
                        </>
                      </div>
                      :
                      product.variants.map((productVariant, key1) => {
                        return (
                          productVariant.type.map((variantType, key2) => {
                            return (
                              <div key={[product.productId, key1, key2]} className={styles.product_info}>
                                <input
                                  type="checkbox"
                                  checked
                                  // checked={selectedProducts.find((selected) => selected.id === product.id) !== undefined}
                                  onChange={() => handleProductToggle(product.productId)}
                                />
                                <div>
                                  <Image src={product.productFirtsImgURL} width={100} height={100} alt="name" />
                                  <Link href={`/administrator/admin/product-managment/product-details/${product.productId}`}>
                                    <p>{product.productName} ({variantType.variant})</p>
                                  </Link>
                                </div>
                                <div>{product.category}</div>
                                <div>{variantType.stock}</div>
                                <div>{variantType.price}</div>
                                <>
                                  <div className={styles.deals_input}>
                                    <input
                                      disabled={product.dealId !== undefined || product.dealProduct}
                                      type="text"
                                      placeholder="Discount"
                                      name="saleProduct"
                                      value={variantType.discount || ""}
                                      onChange={(event) => handleProductDiscountChange(event, product.productId, undefined, variantType.title, variantType.variant, key1, key2)}
                                    />
                                  </div>
                                  <div className={styles.deals_input}>
                                    <input
                                      type="text"
                                      placeholder="Net Value"
                                      disabled
                                      value={calculateFinalValue(variantType.price, variantType.discount)}
                                    />
                                  </div>
                                </>
                              </div>
                            )
                          })
                        )
                      })
                  )
                })}
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
                    <div>Final Price</div>
                  </div>
                  {productList.map((product) => (
                    <>
                      {product.variants.length === 0 ?
                        <div key={product.productId} className={styles.product_info}>
                          <input
                            type="checkbox"
                            checked={selectedProducts.find((selected) => selected.productId === product.productId) !== undefined}
                            onChange={() => handleProductToggle(product.productId)}
                          />
                          <div>
                            <Image src={product.productFirtsImgURL} width={100} height={100} alt="name" />
                            <Link href={`/administrator/admin/product-managment/product-details/${product.productId}`}>
                              <p>{product.productName}</p>
                            </Link>
                          </div>
                          <div>{product.category}</div>
                          <div>{product.stock}</div>
                          <div>{calculateFinalValue(product.price, product.discount)}</div>
                        </div>
                        :
                        product.variants.map((varinatProduct, key1) => {
                          return varinatProduct.type.map((variantType, key2) => {
                            return (
                              <div key={[product.productId, key1, key2]} className={styles.product_info}>
                                <input
                                  type="checkbox"
                                  checked={selectedProducts.find((selected) => selected.productId === product.productId) !== undefined}
                                  onChange={() => handleProductToggle(product.productId, varinatProduct.title, variantType.variant)}
                                />
                                <div>
                                  <Image src={product.productFirtsImgURL} width={100} height={100} alt="name" />
                                  <Link href={`/administrator/admin/product-managment/product-details/${product.productId}`}>
                                    <p>{product.productName} ({variantType.variant})</p>
                                  </Link>
                                </div>
                                <div>{product.category}</div>
                                <div>{variantType.stock}</div>
                                <div>{calculateFinalValue(variantType.price, variantType.discount)}</div>
                              </div>
                            )
                          })
                        })
                      }
                    </>
                  ))}
                </>
              }
            </div>
          </div>
          <center>
            <button type="submit" style={{ width: "max-content", fontWeight: "600" }}>Save Changes</button>
          </center>
        </form>
      }

    </div>
  );
};

export default SpecialDeals;
