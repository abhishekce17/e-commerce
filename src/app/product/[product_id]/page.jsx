"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from "@/Styles/productDetail.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { RiAccountCircleFill } from "react-icons/ri"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Loading from '@/app/administrator/admin/loading'
import UserAuthContext from '@/app/contextProvider'
import _ from "lodash"


const Page = ({ params }) => {
  const { product_id } = params;
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const router = useRouter()
  const context = useContext(UserAuthContext)
  let setVar = {}
  searchParams.forEach((v, k) => setVar = { ...setVar, [k]: v })
  const [selectedVariant, setSelectedVariant] = useState(setVar)
  const [productDetails, setProductDetails] = useState(null)
  const [priceDiscount, setPriceDiscount] = useState({ price: null, discount: null })
  const [selectedImage, setSelectedImgUrl] = useState(null)
  const [insideCart, setInsideCart] = useState(context.userData.Cart.some(x => (x.productId === product_id) && (_.isEqual(x.variant, selectedVariant))))

  function handlePrice(details, selectedVariant) {
    let obj;
    if (details.price !== undefined && details.price !== "" && details.price !== null && details.price !== 0) {
      setPriceDiscount({ price: details.price, discount: details.discount })
    } else {
      for (const key in selectedVariant) {
        const priceObj = details.variants.filter(x => x.type.some((val) => "price" in val))[0].type.filter(x => x.variant === selectedVariant[key])[0]
        if (priceObj !== undefined) {
          obj = priceObj
        }
      }
    }
    setPriceDiscount({ price: obj?.price, discount: obj?.discount })
  }


  function handleSelection(property, title, variant) {
    // searchParams.forEach(x => console.log(x))
    if (property === "variant") {
      setSelectedVariant({ ...selectedVariant, [title]: variant })
    } else if (property === "image") {
      setSelectedImgUrl(title) // title will act as url in the case of image selection
    }
    setInsideCart(context.userData.Cart.some(x => (x.productId === product_id) && (_.isEqual(x.variant, { ...selectedVariant, [title]: variant }))))
    handlePrice(productDetails, { ...setVar, [title]: variant })
  }

  const fetchDetails = useCallback(async () => {
    const res = await fetch(`/api/product-details/${product_id}`, {
      method: 'GET',
    });
    const result = await res.json();
    if (result.status === 200) {
      setSelectedImgUrl(result.data.imgURLs[0])
      handlePrice(result.data, setVar)
      setProductDetails(result.data)
    } else if (result.status === 500) {
      alert("Product Not Found")
      router.back()
    }
  }, [pathname])

  useEffect(() => {
    try {
      setInsideCart(context.userData.Cart.some(x => (x.productId === product_id) && (_.isEqual(x.variant, selectedVariant))))
      fetchDetails()
    } catch (e) {
      alert("server not respondig please try again later");
    }
  }, [fetchDetails, context.userData.Cart])


  return (
    <>
      {productDetails ?
        <div className={styles.product_details_container} >
          <div className={styles.product_images_actions} >
            <div className={styles.product_images} >
              <Image width={500} height={500} src={selectedImage} alt='product-image' />
              <div className={styles.extra_images} >
                {
                  productDetails.imgURLs.map((url, index) => {
                    return (
                      <Image key={index} width={500} height={500} onClick={() => { handleSelection("image", url) }} data-selected={selectedImage === url} src={url} alt='product-image' />
                    )
                  })
                }
              </div>
            </div>
            <div className={styles.details} >
              <div className={styles.extra}  >
                <AiFillHeart />
                <AiOutlineHeart />
                <AiOutlineShareAlt />
              </div>
              <h1> {productDetails.productName} </h1>
              <p className={styles.ratings_review} >★★★★☆
                <span>{productDetails.averageRating}</span>|
                <span>625 ratings</span>|
                <span>125 reviews</span>
              </p>
              <p className={styles.price_discount} >M.R.P.<s>{priceDiscount.price}</s> <strong>₹{parseInt(Number(priceDiscount.price) - Number(priceDiscount.price) * (priceDiscount.discount / 100))}</strong> </p>
              <div className={styles.variants_container} >
                <p>variants</p>
                <div>
                  {
                    productDetails.variants.map((each, index) => {
                      return (

                        <div key={index} className={styles.storage_variant} >
                          <p>{each.title}</p>
                          <div key={index} className={styles.storage_options} >

                            {
                              each.type.map((keys, index) => {
                                return (
                                  <Link key={index} href={{ pathname: pathname, query: { ...selectedVariant, [each.title]: keys.variant } }} data-selected={selectedVariant[each.title] === keys.variant && "true"} onClick={() => { handleSelection("variant", each.title, keys.variant) }} replace>{keys.variant}</Link>
                                )
                              })
                            }

                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.utils_container} >
                <div className={styles.pincode_check} >
                  <p>Check delivery option</p>
                  <input type="text" maxLength={6} placeholder="pincode" />
                </div>
                <div className={styles.check_button} >
                  <button>Check</button>
                </div>
              </div>
            </div>
            <div className={styles.action_buttons}>
              <button className={styles.buy_now} >Buy Now</button>
              {!insideCart ?
                <button onClick={() => { context.addToCart(product_id, selectedVariant) }} className={styles.add_to_cart} >Add to cart</button>
                :
                <Link href={"/cart"} className={styles.add_to_cart} >Go to cart</Link>
              }            </div>
          </div>
          <div className={styles.description} >
            {productDetails.specifications.length &&
              <div className={styles.key_feature} >
                <p>key Specification</p>
                <ul>
                  {productDetails.specifications.map((specs, index) => {
                    return (
                      <li key={index} >{specs}</li>
                    )
                  })
                  }
                </ul>
              </div>}
            <div className={styles.captions} >
              <p>More details</p>
              <p>
                {
                  productDetails.description
                }
              </p>
            </div>
          </div>
          <div className={styles.similar_items} >
            <div>
              <span>Similar Items You Might Like</span>
              <span>see all</span>
            </div>
            <ul>

              {

                [...Array(7)].map((undefined, index) => {
                  return (
                    <li key={index} > <Link href={"/product-link"} > <Image width={500} height={500} src={"/category.jpg"} alt='product-image' /> <div><p>Nothing Phone 2 8+ GEN 1 120Hz display</p> <p>From 12$</p> </div> </Link> </li>
                  )
                })
              }
            </ul>
          </div>
          <div className={styles.customer_review_ratings} >
            <p>Ratings and reviews</p>
            <div className={styles.each_review} >
              <div className={styles.profile} >
                <div> <RiAccountCircleFill /> </div>
                <p>Consumer Name</p>
              </div>
              <div className={styles.rating_details} >
                <p>★★★★☆ <span>4</span> </p>
                <p>timeline</p>
                <p>greatest phone all over the wolrd i have seen till now</p>
              </div>
            </div>
            <div className={styles.each_review} >
              <div className={styles.profile} >
                <div> <RiAccountCircleFill /> </div>
                <p>Consumer Name</p>
              </div>
              <div className={styles.rating_details} >
                <p>★★★★☆ <span>4</span> </p>
                <p>timeline</p>
                <p>greatest phone all over the wolrd i have seen till now kakdfhkdf dfkfhakfj akdfkshdf akfjhakdfj</p>
              </div>
            </div>
            <div className={styles.each_review} >
              <div className={styles.profile} >
                <div> <RiAccountCircleFill /> </div>
                <p>Consumer Name</p>
              </div>
              <div className={styles.rating_details} >
                <p>★★★★☆ <span>4</span> </p>
                <p>timeline</p>
                <p>greatest phone all over the wolrd i have seen till now aksdfkf akjdfh afdj akjsdfhaskd fakjdfhakd</p>
              </div>
            </div>
            <div className={styles.each_review} >
              <div className={styles.profile} >
                <div> <RiAccountCircleFill /> </div>
                <p>Consumer Name</p>
              </div>
              <div className={styles.rating_details} >
                <p>★★★★☆ <span>4</span> </p>
                <p>timeline</p>
                <p>greatest phone all over the wolrd i have seen till now kdsfkajdf dfkhkajdfhakdjf adfjhakdfj</p>
              </div>
            </div>
          </div>
        </div>
        : Loading()
      }
    </>
  )
}

export default Page