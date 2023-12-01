"use client"
import styles from "@/Styles/productsLayout.module.css"
import Link from "next/link"
import Image from "next/image"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import Loading from "@/app/administrator/admin/loading"
import UserAuthContext from "@/app/contextProvider"



const Page = () => {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(UserAuthContext)

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
                            obj = { [variant.title]: type.variant }
                        }
                    }
                    obj = { [variant.title]: variant.type[0].variant, ...obj }
                });

            }
        });
        if (minNetValue === Number.MAX_VALUE) {
            return { minNetValue: null, obj }; // No valid netValues found
        }
        return { minNetValue: minNetValue.toLocaleString("en-IN", { useGrouping: true }), obj };
    }

    const addToWishlist = async (product_id) => {
        const response = await fetch(`/api/UserInformation/UpdateWishlist/addToWishlist/${product_id}`)
        const result = await response.json();
        if (result.status === 200) {
            alert("Product is added to wishlist")
            context.setRefresh(prev => !prev);
        } else {
            alert('Something went wrong')
        }
    }
    const removeFromWishlist = async (product_id) => {
        const response = await fetch(`/api/UserInformation/UpdateWishlist/removeFromWishlist/${product_id}`)
        const result = await response.json();
        if (result.status === 200) {
            alert("Product is removed from wishlist")
            context.setRefresh(prev => !prev);
        } else {
            alert('Something went wrong')
        }
    }

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            const response = await fetch("/api/AdminFeatured/FetchFeaturedProduct");
            const result = await response.json();
            if (result.status === 200) {
                console.log(result.data);
                setFeaturedProducts(result.data)
                setIsLoading(false)
            } else {
                alert("Something went wrong please try again later");
                setIsLoading(false)
            }
        }
        fetchFeaturedProducts();
    }, []);


    return (
        <div className={styles.layout} >
            <center> <p style={{ fontSize: "20px", fontWeight: 600 }} >All Featured Products</p> </center>
            {
                isLoading ? Loading() :
                    <div className={styles.layout_container} >

                        {featuredProducts.map((value, index) => {
                            return (
                                <div key={index} className={styles.each_product_card} >
                                    {
                                        context.isUserLoggedIn &&
                                        <span className={styles.wishlist_icon} >
                                            {
                                                context.userData.Personal.wishlist.some(x => x.productId === value.productId) ?
                                                    <AiFillHeart style={{ cursor: "pointer" }} onClick={() => { removeFromWishlist(value.productId) }} />
                                                    :
                                                    <AiOutlineHeart style={{ cursor: "pointer" }} onClick={() => { addToWishlist(value.productId) }} />
                                            }
                                        </span>
                                    }
                                    <Link href={{ pathname: `/product/${value.productId}`, query: { ...extractMinimumNetValue(value.variants)?.obj || "" } }}  >
                                        <Image width={500} height={500} src={value.productFirtsImgURL} alt={value.productFirtsImgURL} />
                                        <div>
                                            <p>{value.productName}</p>
                                        </div>
                                        <div><p>From   &#8377;{extractMinimumNetValue(value.variants)?.minNetValue || parseInt((value.price - (value.price * (value.discount / 100)))).toLocaleString("en-IN", { useGrouping: true })}</p> </div>
                                    </Link>
                                </div>
                            )
                        })}

                    </div>
            }
        </div>
    )
}

export default Page