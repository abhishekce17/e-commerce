"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/Styles/ProductsManagment.module.css"
import { RiSearch2Line } from 'react-icons/ri'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Loading from '../loading'

const Page = () => {
  let router = useRouter()
  const [searchSaleProduct, setSearchSaleProduct] = useState("")
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [productList, setProductList] = useState([])
  const [removableSelectedProducts, setRemovableSelectedProducts] = useState([])
  const [tempData, setTempData] = useState([]);

  const handleSearchProduct = (e) => {
    const { name, value } = e.target
    if (name === "saleProducts") {
      setSearchSaleProduct(value)
    }
  }
  const handleProductToggle = (productId) => {
    // console.log(tempData.some(data => data.productId === productId))
    if (tempData.some(data => data.productId === productId)) {
      const FeaturedId = tempData.find(x => x.productId === productId).FeaturedId
      if (removableSelectedProducts.includes(FeaturedId)) {
        const updatedRemovableProducts = removableSelectedProducts.filter(feat_id => feat_id !== FeaturedId);
        setRemovableSelectedProducts(updatedRemovableProducts);
      } else {
        setRemovableSelectedProducts(prevRemovableProducts => [
          ...prevRemovableProducts,
          FeaturedId
        ]);
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
  };
  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(productList);
    }
    setSelectAll(!selectAll);
  };


  const handleSubmit = async (event) => {
    if (selectedProducts.length) {
      const encodedArray = encodeURIComponent(JSON.stringify(selectedProducts.map(x => x.productId)))
      const AddingResponse = await fetch(`/api/AdminFeatured/AddFeaturedProduct/${encodedArray}`)
      const AddingResult = await AddingResponse.json()
      if (AddingResult.status === 200) {
        alert("Products are Set as Featured Product")
      }
    }
    if (removableSelectedProducts.length) {
      const encodedArray = encodeURIComponent(JSON.stringify(removableSelectedProducts))
      const dealRemoveResponse = await fetch(`/api/AdminFeatured/RemoveFeaturedProduct/${encodedArray}`, {
        method: "DELETE"
      })
      const dealRemoveResult = await dealRemoveResponse.json()
      if (dealRemoveResult.status === 200) {
        alert('Deal is removed')
      }
    }
  };


  async function fetchingAllProductsSnap() {
    const res = await fetch(`/api/product-revenue-details`, {
      method: "GET",
    });
    const result = await res.json()
    if (result.status === 200) {
      console.log(result.data)
      setProductList(result.data)
    }
  }


  async function existDeals() {
    const res = await fetch(`/api/AdminFeatured/FetchFeaturedProduct`, {
      method: "GET",
    });
    const result = await res.json()
    if (result.status === 200) {
      setSelectedProducts(result.data);
      setTempData(result.data)
      // console.log(result.data)
    }
    // SetIsLoading(false)
  }

  useEffect(() => {
    fetchingAllProductsSnap()
    existDeals()
  }, [])

  return (
    <>
      {
        productList.length ?
          <div className={styles.featured_product_managemnet} >
            {selectedProducts.length > 0 &&
              <>
                <h3 style={{ marginBottom: "15px" }} >Featured Products</h3>
                <div className={`${styles.view_products} `}>
                  <div className={styles.headings}>
                    <div style={{ gridColumn: "1 / span 2" }} >Product</div>
                    <div>Category</div>
                    <div>Stock</div>
                    <div>Price</div>
                  </div>
                  {selectedProducts.map((product) => (
                    <div key={product.productId} className={styles.product_info}>
                      <input
                        type="checkbox"
                        checked
                        onChange={() => handleProductToggle(product.productId, product.FeaturedId)}
                      />
                      <div>
                        <Image src={product.productFirtsImgURL} width={100} height={100} alt="name" />
                        <Link href={`/administrator/admin/product-managment/product-details/${product.productId}`}>
                          <p>{product.productName}</p>
                        </Link>
                      </div>
                      <div>{product.category}</div>
                      {
                        product.variants.length ?
                          <>
                            <div style={{ whiteSpace: "pre-wrap" }} >{product.variants.map(ele1 => ele1.type.map(ele2 => `${ele2.variant} - ${ele2.stock}\n`))}</div>
                            <div style={{ whiteSpace: "pre-wrap" }} >{product.variants.map(ele1 => ele1.type.map(ele2 => `${ele2.variant} - ${ele2.price - (ele2.price / 100) * ele2.discount}\n`))}</div>
                          </> :
                          <>
                            <div>{product.stock}</div>
                            <div>{product.price}</div>
                          </>
                      }

                    </div>
                  ))}


                </div>
              </>
            }

            <div style={{ marginTop: "20px" }} >
              <div className={`${styles.view_products}`}>
                <div className={styles.top_bar} style={{ padding: "0" }}>
                  <div style={{ display: "block", width: "100%" }} >
                    <RiSearch2Line style={{ position: 'relative', top: '4px' }} />
                    <input style={{ width: "calc( 100% - 100px )" }} type="text" value={searchSaleProduct} name="saleProducts" onChange={handleSearchProduct} placeholder="Search Product" />
                  </div>
                </div>
                {searchSaleProduct.length > 0 &&
                  <>
                    <div className={styles.headings} style={{ marginTop: "20px" }}>
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAllToggle} />
                      <div>Product</div>
                      <div>Category</div>
                      <div>Stock</div>
                      <div>Price</div>
                    </div>
                    {productList.map((product, index) => (
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
                        {
                          product.variants.length ?
                            <>
                              <div style={{ whiteSpace: "pre-wrap" }} >{product.variants.map(ele1 => ele1.type.map(ele2 => `${ele2.variant} - ${ele2.stock}\n`))}</div>
                              <div style={{ whiteSpace: "pre-wrap" }} >{product.variants.map(ele1 => ele1.type.map(ele2 => `${ele2.variant} - ${ele2.price - (ele2.price / 100) * ele2.discount}\n`))}</div>
                            </> :
                            <>
                              <div>{product.stock}</div>
                              <div>{product.price}</div>
                            </>
                        }

                      </div>
                    ))}
                  </>
                }
              </div>
              <center>
                <button type="submit" onClick={handleSubmit} style={{ marginTop: "25px", width: "max-content", fontWeight: "600" }}>Save Changes</button>
              </center>
            </div>
          </div >
          : Loading()
      }
    </>
  )
}

export default Page