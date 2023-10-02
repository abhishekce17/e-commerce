"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/Styles/ProductsManagment.module.css"
import { RiSearch2Line } from 'react-icons/ri'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Loading from '../loading'

const Page = () => {

  const [fetchedProducts, setFetchedProducts] = useState([])

  let router = useRouter()
  const handleClick = () => {
    router.push("/administrator/admin/product-managment/add-products")
  }

  function calulateNetValue(price, discount) {
    return price - (price * (discount / 100))
  }

  function renderProductinfo(data, type, index) {
    return (
      <div key={index} className={styles.product_info} style={{ margin: "20px 0" }} >
        <input type='checkbox' />
        <div>
          <Image src={data.productFirtsImgURL} width={100} height={100} alt='name' />
          <Link href={"product-managment/product-details/" + data.productId} >
            <p> {data.productName} </p>
          </Link>
        </div>
        <div>{type?.variant || "---"}</div>
        <div>{data.category}</div>
        <div>{type?.stock || data.stock}</div>
        <div>{calulateNetValue(type?.price || data.price, type?.discount || data.discount)}</div>
        <div>{type?.sold || data.sold}</div>
        <div> {type?.revenue || data.revenue} </div>
      </div>
    )
  }


  useEffect(() => {
    async function fetchingAllProductsSnap() {
      const res = await fetch(`/api/product-revenue-details`, {
        method: "GET",
        // body: formDataAPI,
      });
      const result = await res.json()
      if (result.status === 200) {
        setFetchedProducts(result.data)
      }
    }

    fetchingAllProductsSnap()

  }, [])

  return (
    <div className={styles.product_managemnet} >
      <div className={styles.view_products} >
        <div className={styles.top_bar} >
          <div> <RiSearch2Line style={{ position: "relative", top: "4px" }} /> <input type='text' placeholder='Search Product' /> </div>
          <button onClick={handleClick} >+ Add Product</button>
        </div>
        <div className={styles.headings} >
          <input type='checkbox' />
          <div>Product</div>
          <div>Variant</div>
          <div>Category</div>
          <div>Stock</div>
          <div>Net Price</div>
          <div>Sold</div>
          <div>Revenue</div>
        </div>

        {
          fetchedProducts.length ?
            fetchedProducts.map((data, index1) => {
              return (
                !data.variants.length ?
                  renderProductinfo(data, undefined, index1)
                  :
                  data.variants.map((eachVariant, index2) => {
                    return (
                      eachVariant.type.map((type, index3) => {
                        return ((type.price !== undefined
                          && type.discount !== undefined)
                          ? renderProductinfo(data, type, index3, data) :
                          renderProductinfo(data, undefined, index3))
                      })
                    )
                  })
              )
            }) :
            Loading()
        }

      </div>
    </div>
  )
}

export default Page