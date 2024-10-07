"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/Styles/productDetail.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Loading from '@/app/administrator/admin/loading'
import _ from "lodash"
import extractMinimumNetValue from '@/utils/ExtractMinimumNetValue'
import { notify } from '@/utils/notify'
import CommentSection from '@/Components/CommentSection'
import { ProductListLayout } from '@/Components/ProductListLayout'
import { ProductCard } from '@/Components/ProductCard'
import { OutlineButton } from '@/Components/OutlineButton'
import { PrimaryButton } from '@/Components/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlistAction, removeFromWishlistAction } from '@/features/user-details/userSlice'
import { removeFromWishlist } from '@/actions/removeFromWishlist'
import { addToWishlist } from '@/actions/addToWishlist'
import { addReviewToProduct } from '@/actions/addReviewToProduct'
import { addToCart } from '@/actions/addToCart'
import { setBuyingProduct } from '@/features/user-details/buyingProductSlice'
import { handlePrice } from '@/utils/HandlePrice'


const ProductDetail = ({ productDetails, similarProducts, defaultSelectedVariant, defaultPrice }) => {
    // console.log("rerendered product details page")

    const product_id = productDetails.productId;
    const userData = useSelector(state => state.userData.userData);
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const router = useRouter();
    let setVar = {}
    searchParams.forEach((v, k) => setVar = { ...setVar, [k]: v });
    const [selectedVariant, setSelectedVariant] = useState(defaultSelectedVariant);
    const [priceDiscount, setPriceDiscount] = useState(defaultPrice);
    const [selectedImage, setSelectedImgUrl] = useState(productDetails.imgURLs[0]);
    const [insideCart, setInsideCart] = useState(userData.Cart.some(x => (x.productId === product_id) && (_.isEqual(x.variant, selectedVariant))))
    const [wishlist, setWishlist] = useState(userData.Personal.wishlist.includes(product_id));
    const [orderedProduct, setOrderedProduct] = useState(false);
    const [reviewRating, setReviewRating] = useState({ Rating: -1, Review: "" })
    const [ReviewRatingArray, setReviewRatingArray] = useState(productDetails.ReviewRatingArray);
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
        setPriceDiscount(handlePrice(productDetails, { ...verifiedVar }));
        return verifiedVar;
    }


    const hadnleWishlist = async ({ action, productId }) => {
        notify("saving...", "loading")
        if (action === "addToWishlist") {
            const response = await addToWishlist({ productId: productId });
            if (response.status === 200) {
                dispatch(addToWishlistAction({ productId: productId }));
                setWishlist(true);
                notify(response.message, "success");
            } else {
                notify(response.message, "error");
            }
        } else if (action === "removeFromWishlist") {
            const response = await removeFromWishlist({ productId: productId });
            if (response.status === 200) {
                dispatch(removeFromWishlistAction({ productId: productId }));
                setWishlist(false);
                notify(response.message, "success");
            } else {
                notify(response.message, "error");
            }
        }
    }

    function handleSelection(property, title, variant) {
        if (property === "variant") {
            const newSelectedVariant = { ...selectedVariant, [title]: variant };
            setSelectedVariant(newSelectedVariant)
            setInsideCart(userData.Cart.some(x => (x.productId === product_id) && (_.isEqual(x.variant, newSelectedVariant))));
            setPriceDiscount(handlePrice(productDetails, { ...setVar, [title]: variant }));
        } else if (property === "image") {
            setSelectedImgUrl(title) // title will act as url in the case of image selection
        }
    }


    const checkEligibility = async () => {
        if (userData.OrderDetails.some(x => x.productId === product_id)) {
            setOrderedProduct(true);
        } else {
            notify("You haven't experienced this product, please first buy this product", "error");
        }
    }

    const submitReview = async () => {
        const response = await addReviewToProduct({ Rating: reviewRating.Rating, Review: reviewRating.Review, userName: userData.Personal.fullName })
        if (response.status === 200) {
            notify(response.message, "success");
            setReviewRatingArray(state => state.push({ Rating: reviewRating.Rating, Review: reviewRating.Review, userName: userData.Personal.fullName }));
        } else {
            notify(response.message, "error");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewRating(prev => { return { ...prev, [name]: value } })
    }

    const handleBuy = () => {
        const subInfo = Object.values(selectedVariant).flatMap((v) => {
            return productDetails.variants.flatMap((x) => {
                const foundType = x.type.find((y) => y.price && y.variant === v);
                return foundType ? [{ ...foundType }] : [];
            });
        });
        const { brandName, category, discount, price, productId, productName } = productDetails;
        dispatch(setBuyingProduct([{ quantity: 1, productFirtsImgURL: productDetails.imgURLs[0], brandName, category, discount, price, productId, productName, ...subInfo[0], variant: selectedVariant }]));
        router.push("/place-your-order/order-summary");
    }

    const handleAddToCart = async () => {
        notify("adding", "loading")
        const response = await addToCart({ productId: product_id, variant: selectedVariant, quantity: 1 });
        if (response.status === 200) {
            dispatch(addToWishlistAction({ productId: product_id }));
            setInsideCart(true);
            notify(response.message, "success");
        } else {
            notify(response.message, "error");
        }
        setDisableBtn(false);
    }

    useEffect(() => {
        searchParamsValidation(productDetails.variants)
    }, [])

    return (
        <>
            {productDetails ?
                <div className="md:px-[10%] lg:px-[0] xl:px-[12%]" >

                    <div className="grid lg:grid-cols-2 gap-2 rounded-lg mb-5" >
                        <div className="w-full">
                            <Image width={500} height={500} src={selectedImage} alt='product-image' className="w-full h-auto aspect-square rounded-md" />
                            <div className="flex gap-2 overflow-y-scroll no-scrollbar mt-2" >
                                {
                                    productDetails.imgURLs.map((url, index) => {
                                        return (
                                            <Image key={index} width={500} height={500} onClick={() => { handleSelection("image", url) }} src={url} alt='product-image' className={`w-[24%] rounded-md h-full aspect-square border-2 ${selectedImage === url ? "border-primary-light" : "border-none"}`} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="text-black p-8 bg-white relative rounded-md md:flex flex-col justify-between">
                            <div className="absolute right-6 top-6 lg:text-3xl text-xl cursor-default text-custom-dark-gray" >
                                {userData.Account.agreedTermAndCondition && <>

                                    <span className="text-primary" >
                                        {
                                            wishlist ?
                                                <AiFillHeart onClick={() => hadnleWishlist({ action: "removeFromWishlist", productId: productDetails.productId })} />
                                                :
                                                <AiOutlineHeart onClick={() => hadnleWishlist({ action: "addToWishlist", productId: productDetails.productId })} />
                                        }
                                    </span>
                                </>}
                                <AiOutlineShareAlt style={{ cursor: "pointer" }} onClick={() => { navigator.share({ title: productDetails.productName, url: pathname }) }} />
                            </div>
                            <p className="font-semibold text-2xl md:text-3xl lg:text-4xl" > {productDetails.productName} </p>
                            <span className="flex gap-2 lg:text-lg" >
                                <span>★ {productDetails.averageRating}</span>|
                                <span>625 ratings</span>|
                                <span>125 reviews</span>
                            </span>
                            <p className="text-xl my-2" >M.R.P.<span className="text-3xl font-semibold mx-2">₹{parseInt(Number(priceDiscount.price) - Number(priceDiscount.price) * (priceDiscount.discount / 100))?.toLocaleString("en-IN", { useGrouping: true })}</span> {(priceDiscount.discount !== null) && <> <s>₹{priceDiscount.price?.toLocaleString("en-IN", { useGrouping: true })}</s> <sup>{parseInt(priceDiscount.discount)}% off</sup> </>} </p>
                            {productDetails.variants.length ?
                                <div className="border-t-2 border-b-2 border-custom-lightest-gray lg:text-xl my-3 py-3" >
                                    {
                                        productDetails.variants.map((each, index) => {
                                            return (

                                                <div key={index} >
                                                    <p>{each.title}</p>
                                                    <div key={index} className="my-4 flex flex-wrap gap-3 " >

                                                        {
                                                            each.type.map((keys, index) => {
                                                                return (
                                                                    <Link
                                                                        key={index}
                                                                        href={{ pathname: pathname, query: { ...selectedVariant, [each.title]: keys.variant } }}
                                                                        onClick={() => { handleSelection("variant", each.title, keys.variant) }}
                                                                        replace
                                                                        className={`text-primary shadow border-2 cursor-default p-3 rounded-md ${selectedVariant[each.title] === keys.variant ? "border-primary-light" : ""}`}
                                                                    >
                                                                        {keys.variant}
                                                                    </Link>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> : undefined}
                            <div className="flex gap-5 items-end mb-5" >
                                <div className="md:text-lg lg:text-xl" >
                                    <p>Check delivery option</p>
                                    <input className="mt-2 border-b-2 outline-none" type="text" maxLength={6} placeholder="pincode" />
                                </div>
                                <OutlineButton label="Check" className="border-2" />
                            </div>
                            <div className="flex gap-5">
                                <div className="rounded-3xl overflow-hidden" >
                                    <PrimaryButton className="md:text-lg lg:text-xl" label="Buy Now" onClick={handleBuy} />
                                </div>
                                {insideCart ?
                                    <OutlineButton label="Go to Cart" href={"/cart"} className="md:text-lg lg:text-xl border-2" />
                                    :
                                    <OutlineButton label="Add to Cart" disabled={disableBtn} className="md:text-lg lg:text-xl border-2" onClick={async () => { setDisableBtn(true); handleAddToCart() }} />
                                }
                            </div>
                        </div>
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

                    <ProductListLayout heading="Similar Items You Might Like" href={`/category/${productDetails.category}`} >
                        {

                            similarProducts.map((prop, index) => {
                                return (
                                    <ProductCard
                                        showButtons={false}
                                        key={prop.productId}
                                        productInfo={prop}
                                        href={{ pathname: `/product/${prop.productId}`, query: { ...extractMinimumNetValue(prop.variants)?.obj || "" } }}
                                    />
                                )
                            })
                        }
                    </ProductListLayout>

                    <div className={styles.customer_review_ratings} >
                        <div style={{ fontWeight: 700, display: "flex", justifyContent: "space-between" }} >
                            <p>Ratings and reviews</p>
                            {userData.Account.agreedTermAndCondition ? <OutlineButton onClick={checkEligibility} style={{ fontSize: "12px", padding: "8px 10px" }} label="Add Review" className="text-sm" /> : undefined}
                        </div>
                        {orderedProduct && <div style={{ fontWeight: 700, display: "flex", flexDirection: "column", gap: "7px" }} >
                            <div style={{ fontSize: "35px", textAlign: "center", color: "grey", letterSpacing: "0.5rem" }} > {[...Array(5)].map((undefined, index) => <span key={index} style={{ color: reviewRating.Rating >= index && "initial", cursor: "default" }} onClick={(e) => { e.target.name = "Rating", e.target.value = index, handleChange(e) }} >★</span>)} </div>
                            <textarea rows={10} style={{ fontSize: "18px", padding: "7px", borderRadius: "3px", resize: "none" }} type='text' name='Review' value={reviewRating.Review} onChange={handleChange} />
                            <button className={styles.add_to_cart} onClick={submitReview} style={{ fontSize: "12px", padding: "8px 10px" }} >Submit</button>
                        </div>}
                        {ReviewRatingArray.length ? <CommentSection ReviewArray={ReviewRatingArray} /> : undefined}
                    </div>

                </div >
                : Loading()
            }
        </>
    )
}

export default ProductDetail