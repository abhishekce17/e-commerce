"use client"
import React, { useState } from 'react'
import styles from "@/Styles/ProductsManagment.module.css"
import { RiSearch2Line } from 'react-icons/ri'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  let router = useRouter()
  const [searchSaleProduct, setSearchSaleProduct] = useState("")
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSearchProduct = (e) => {
    const { name, value } = e.target
    if (name === "saleProducts") {
      setSearchSaleProduct(value)
    }
  }
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


  const productList = [
    { id: 1, name: 'Product 1', category: 'Mobiles', stock: 2250, price: 1522 },
    { id: 2, name: 'Product 2', category: 'Mobiles', stock: 2250, price: 1522 },
    { id: 3, name: 'Product 3', category: 'Mobiles', stock: 2250, price: 1522 },
    // Add more products as needed
  ];
  return (
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

                </div>
              ))}
            </>
          }
        </div>
      </div>
    </div >
  )
}

export default page