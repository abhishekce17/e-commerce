"use client"
import styles from "@/Styles/wishlist.module.css"
import Loading from "@/app/administrator/admin/loading";
import UserAuthContext from "@/app/contextProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md"

const page = () => {
    // Dummy order data
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
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
    const fetchWishlist = async () => {
        setIsLoading(true)
        encodeURIComponent(JSON.stringify(context.userData.Personal.wishlist))
        if (context.userData.Personal.wishlist.length) {
            const response = await fetch(`/api/UserInformation/UpdateWishlist/FetchWishlistInfo/${encodeURIComponent(JSON.stringify(context.userData.Personal.wishlist))}`)
            const result = await response.json()
            if (result.status === 200) {
                setWishlistProducts(result.wishlistProducts)
                setIsLoading(false);
            } else {
                setIsLoading(false)
                alert(`Error occured while fetching products`)
            }
        } else {
            setIsLoading(false)
        }
    }
    const removeFromWishlist = async (product_id) => {
        const response = await fetch(`/api/UserInformation/UpdateWishlist/removeFromWishlist/${product_id}`)
        const result = await response.json();
        if (result.status === 200) {
            alert("Product is removed from wishlist")
            let tempList = context.userData.Personal.wishlist.filter(x => x !== product_id)
            context.setUserData(prev => {
                return { ...prev, Personal: { ...prev.Personal, wishlist: tempList } }
            })
            fetchWishlist()
        } else {
            alert('Something went wrong')
        }
    }

    useEffect(() => {
        fetchWishlist();
    }, [])

    return (
        <>
            <h3>My Wishlist</h3>

            {isLoading ? Loading() : <div className={styles.order_history}>
                {wishlistProducts.map((product, orderIndex) => (
                    <div key={orderIndex} className={styles.each_order}>
                        <Image height={520} width={520} src={product.productFirtsImgURL} alt={product.productFirtsImgURL} />
                        <div>
                            <p>
                                <Link href={`/product/${product.productId}`} >{product.productName}</Link>
                                <span>From   &#8377;{extractMinimumNetValue(product.variants)?.minNetValue || parseInt((product.price - (product.price * (product.discount / 100)))).toLocaleString("en-IN", { useGrouping: true })}</span>
                            </p>
                        </div>
                        <MdDelete style={{ cursor: "pointer" }} onClick={() => { removeFromWishlist(product.productId) }} className={styles.remove} />
                    </div>
                ))}
            </div>}
        </>
    );
};

export default page;
