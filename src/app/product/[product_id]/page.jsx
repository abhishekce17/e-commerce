"use client"
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import styles from "@/Styles/productDetail.module.css"
import Image from 'next/image'
import Link from 'next/link'
import {AiFillHeart, AiOutlineHeart, AiOutlineShareAlt, AiOutlinePlus, AiOutlineMinus} from "react-icons/ai"
import {RiAccountCircleFill} from "react-icons/ri"
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import Loading from '@/app/administrator/admin/loading'
import UserAuthContext from '@/app/contextProvider'
import _, {set} from "lodash"
import {notify} from '@/JS/notify'


const Page = ({params}) => {
  const {product_id} = params;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const context = useContext(UserAuthContext)
  let setVar = {}
  searchParams.forEach((v, k) => setVar = {...setVar, [k]: v});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [productDetails, setProductDetails] = useState(null)
  const [priceDiscount, setPriceDiscount] = useState({price: null, discount: null})
  const [selectedImage, setSelectedImgUrl] = useState(null)
  const [insideCart, setInsideCart] = useState(context.userData !== null ? context.userData.Cart.some(x => (x.productId === product_id) && (_.isEqual(x.variant, selectedVariant))) : undefined)
  const [wishlist, setWishlist] = useState(context.userData?.Personal.wishlist.some(x => x.productId === product_id));
  const [orderedProduct, setOrderedProduct] = useState(false);
  const [reviewRating, setReviewRating] = useState({Rating: -1, Review: ""})
  const [ReviewRatingArray, setReviewRatingArray] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const searchParamsValidation = (ogVariant) => {
    let verifiedVar = {};
    ogVariant.map((x) => {
      if (searchParams.size) {
        const keys = new Set(searchParams.keys());
        const values = new Set(x.type.map(x => x.variant));
        if (keys.has(x.title)) {
          verifiedVar[x.title] = values.has(searchParams.get(x.title)) ? searchParams.get(x.title) : x.type[0].variant;
        } else {
          verifiedVar[x.title] = x.type[0].variant;
        }
      } else {
        verifiedVar[x.title] = x.type[0].variant;
      }
    })
    setSelectedVariant(verifiedVar);
    return verifiedVar;
  }

  function handlePrice(details, selectedVariant) {
    let obj;
    if (details.price !== undefined && details.price !== "" && details.price !== null && details.price !== 0) {
      setPriceDiscount({price: details.price, discount: details.discount})
    } else {
      for (const key in selectedVariant) {
        const priceObj = details.variants.filter(x => x.type.some((val) => "price" in val))[0].type.filter(x => x.variant === selectedVariant[key])[0]
        if (priceObj !== undefined) {
          obj = priceObj
        }
      }
      setPriceDiscount({price: obj?.price, discount: obj?.discount})
    }
  }


  function extractMinimumNetValue(variants) {
    if (!Array.isArray(variants) || variants.length === 0) {
      return null; // Handle invalid input
    }

    let minNetValue = Number.MAX_VALUE;
    let obj = {}
    variants.forEach(variant => {
      if (Array.isArray(variant.type)) {
        variant.type.forEach(type => {
          if (type.price && !isNaN(Number(type.price))) {
            const netValue = parseInt((type.price - (type.price * (type.discount / 100))));
            if (netValue < minNetValue) {
              minNetValue = netValue;
              obj = {[variant.title]: type.variant}
            }
          }
          obj = {[variant.title]: variant.type[0].variant, ...obj}
        });

      }
    });
    if (minNetValue === Number.MAX_VALUE) {
      return {minNetValue: null, obj}; // No valid netValues found
    }
    return {minNetValue: minNetValue.toLocaleString("en-IN", {useGrouping: true}), obj};
  }

  const addToWishlist = async () => {
    const response = await fetch(`/api/UserInformation/UpdateWishlist/addToWishlist/${product_id}`)
    const result = await response.json();
    if (result.status === 200) {
      context.userData.Personal.wishlist.push({productId: product_id});
      notify("Product is added to wishlist", "success");
      setWishlist(true)
    } else {
      alert('Something went wrong')
    }
  }
  const removeFromWishlist = async () => {
    const response = await fetch(`/api/UserInformation/UpdateWishlist/removeFromWishlist/${product_id}`)
    const result = await response.json();
    if (result.status === 200) {
      const tempList = context.userData.Personal.wishlist.filter(x => x.productId !== product_id);
      context.setUserData(prev => {
        return {...prev, Personal: {...prev.Personal, wishlist: tempList}}
      })
      notify("Product removed from wishlist", "success");
      setWishlist(false)
    } else {
      alert('Something went wrong')
    }
  }

  function handleSelection(property, title, variant) {
    if (property === "variant") {
      setSelectedVariant({...selectedVariant, [title]: variant})
    } else if (property === "image") {
      setSelectedImgUrl(title) // title will act as url in the case of image selection
    }
    if (context.userData !== null) {setInsideCart(context.userData.Cart.some(x => (x.productId === product_id) && (_.isEqual(x.variant, {...selectedVariant, [title]: variant}))))}
    handlePrice(productDetails, {...setVar, [title]: variant})
  }


  const checkEligibility = async () => {
    if (context.userData.OrderDetails.some(x => x.productId === product_id)) {
      setOrderedProduct(true);
    } else {
      notify("You haven't experienced this product, please first buy this product", "error");
    }
  }

  const submitReview = async () => {
    const response = await fetch(`/api/ReviewRating/addReview/${product_id}`, {
      method: "POST",
      body: JSON.stringify({Rating: reviewRating.Rating, Review: reviewRating.Review, userName: context.userData.Personal.fullName})
    });
    const result = await response.json();
    if (result.status === 200) {
      window.location.reload()
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setReviewRating(prev => {return {...prev, [name]: value}})
  }

  const fetchDetails = useMemo(async () => {
    const res = await fetch(`/api/product-details/${product_id}`, {
      method: 'GET',
    });
    const result = await res.json();
    if (result.status === 200) {
      // await searchParamsValidation(result.data.variants);
      setSelectedImgUrl(result.data.imgURLs[0]);
      handlePrice(result.data, searchParamsValidation(result.data.variants));
      setProductDetails(result.data);
      setReviewRatingArray(result.data.ReviewRatingArray);
      fetchSimilarProducts(result.data.category)
    } else if (result.status === 500 || result.status === 404) {
      notify("Product Not Found", "error");
      router.back()
    }
  }, [pathname])
  const fetchSimilarProducts = async (category) => {
    const response = await fetch(`/api/FetchCategoryProducts/${category}`);
    const result = await response.json();
    if (result.status === 200) {
      console.log(result.data);
      setSimilarProducts(result.data)
    } else {
      alert("Something went wrong please try again later");
    }
  }

  const handleBuy = () => {
    // console.log(selectedVariant);
    context.setBuyingProduct([{selectedVariant, productDetails}]);
    router.push("/place-your-order/order-summary")
  }

  useEffect(() => {
    try {
      if (context.userData !== null) {
        setInsideCart(context.userData.Cart.some(x => (x.productId === product_id) && (_.isEqual(x.variant, selectedVariant))))
      }
    } catch (e) {
      alert("server not respondig please try again later");
    }
  }, [fetchDetails, context.userData?.Cart])


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
                      <Image key={index} width={500} height={500} onClick={() => {handleSelection("image", url)}} data-selected={selectedImage === url} src={url} alt='product-image' />
                    )
                  })
                }
              </div>
            </div>
            <div className={styles.details} >
              <div className={styles.extra}  >
                {context.isUserLoggedIn && <>

                  {
                    wishlist ?
                      <AiFillHeart style={{cursor: "pointer"}} onClick={removeFromWishlist} />
                      :
                      <AiOutlineHeart style={{cursor: "pointer"}} onClick={addToWishlist} />
                  }
                </>}
                <AiOutlineShareAlt style={{cursor: "pointer"}} onClick={() => {navigator.share({title: productDetails.productName, url: pathname})}} />
              </div>
              <h1> {productDetails.productName} </h1>
              <p className={styles.ratings_review} >★★★★☆
                <span>{productDetails.averageRating}</span>|
                <span>625 ratings</span>|
                <span>125 reviews</span>
              </p>
              <p className={styles.price_discount} >M.R.P. <strong>₹{parseInt(Number(priceDiscount.price) - Number(priceDiscount.price) * (priceDiscount.discount / 100))?.toLocaleString("en-IN", {useGrouping: true})}</strong> {(priceDiscount.discount !== null) && <> <s>₹{priceDiscount.price?.toLocaleString("en-IN", {useGrouping: true})}</s> <sup>{parseInt(priceDiscount.discount)}% off</sup> </>} </p>
              {productDetails.variants.length && <div className={styles.variants_container} >
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
                                  <Link key={index} href={{pathname: pathname, query: {...selectedVariant, [each.title]: keys.variant}}} data-selected={selectedVariant[each.title] === keys.variant && "true"} onClick={() => {handleSelection("variant", each.title, keys.variant)}} replace>{keys.variant}</Link>
                                )
                              })
                            }

                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>}
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
              <button className={styles.buy_now} onClick={handleBuy} >Buy Now</button>
              {!insideCart ?
                <button onClick={() => {setDisableBtn(true); context.addToCart(product_id, selectedVariant)}} disabled={disableBtn} className={styles.add_to_cart} >Add to cart</button>
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
              <span> <Link href={`/category/${productDetails.category}`}> see all</Link></span>
            </div>
            <ul>

              {

                similarProducts.map((data, index) => {
                  return (
                    <li key={index} > <Link href={{pathname: `/product/${data.productId}`, query: {...extractMinimumNetValue(data.variants)?.obj || ""}}} > <Image width={500} height={500} src={data.productFirtsImgURL} alt={data.productFirtsImgURL} /> <div><p>{data.productName}</p> <p>From   &#8377;{extractMinimumNetValue(data.variants)?.minNetValue || parseInt((data.price - (data.price * (data.discount / 100)))).toLocaleString("en-IN", {useGrouping: true})}</p> </div> </Link> </li>
                  )
                })
              }
            </ul>
          </div>
          <div className={styles.customer_review_ratings} >
            <div style={{fontWeight: 700, display: "flex", justifyContent: "space-between"}} >
              <p>Ratings and reviews</p>
              {context.isUserLoggedIn && <button className={styles.add_to_cart} onClick={checkEligibility} style={{fontSize: "12px", padding: "8px 10px"}} >Add Review</button>}
            </div>
            {orderedProduct && <div style={{fontWeight: 700, display: "flex", flexDirection: "column", gap: "7px"}} >
              <div style={{fontSize: "35px", textAlign: "center", color: "grey", letterSpacing: "0.5rem"}} > {[...Array(5)].map((undefined, index) => <span key={index} style={{color: reviewRating.Rating >= index && "initial", cursor: "default"}} onClick={(e) => {e.target.name = "Rating", e.target.value = index, handleChange(e)}} >★</span>)} </div>
              <textarea rows={10} style={{fontSize: "18px", padding: "7px", borderRadius: "3px", resize: "none"}} type='text' name='Review' value={reviewRating.Review} onChange={handleChange} />
              <button className={styles.add_to_cart} onClick={submitReview} style={{fontSize: "12px", padding: "8px 10px"}} >Submit</button>
            </div>}
            {ReviewRatingArray.length ? ReviewRatingArray.map((data, index) => {
              return (
                <div key={index} className={styles.each_review} >
                  <div className={styles.profile} >
                    <div> <RiAccountCircleFill /> </div>
                    <p>{data.userName}</p>
                  </div>
                  <div className={styles.rating_details} >
                    <p><span>{new Date(data.timeStamp).toLocaleDateString()}</span> <span>{new Date(data.timeStamp).toLocaleTimeString()}</span></p>
                    <p style={{fontSize: "1.2rem"}} > ★★★★☆ <span>{data.Rating}</span> </p>
                    <p>{data.Review}</p>
                  </div>
                </div>
              )
            }) : undefined
            }
          </div>
        </div >
        : Loading()
      }
    </>
  )
}

export default Page