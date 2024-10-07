"use client"
import fetchWishlistProductDetails from "@/actions/fetchWishlistProductDetails";
import { removeFromWishlist } from "@/actions/removeFromWishlist";
import { removeFromWishlistAction } from "@/features/user-details/userSlice";
import extractMinimumNetValue from "@/utils/ExtractMinimumNetValue";
import { notify } from "@/utils/notify";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";

export default function page() {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const wishlistProductIds = useSelector(state => state.userData.userData.Personal.wishlist);
    const dispatch = useDispatch();

    const removeProductFromWishlist = async (productId) => {
        notify("removing", "loading")
        const response = await removeFromWishlist({ productId: productId });
        if (response.status === 200) {
            setWishlistProducts(wishlistProducts.filter(x => x.productId !== productId))
            dispatch(removeFromWishlistAction({ productId: productId }));
            notify(response.message, "success");
        } else {
            notify(response.message, "error");
        }
    }

    useEffect(() => {
        const fetchWishList = async () => {
            const response = await fetchWishlistProductDetails({ wishlistArray: wishlistProductIds });
            if (response.status === 200) {
                console.log(response.wishlistProductsSnap)
                setWishlistProducts(response.wishlistProductsSnap);
            } else {
                notify(response.message, "error");
            }
        }
        if (wishlistProductIds.length > 0) {
            fetchWishList();
        }
    }, [])

    return (
        <div className="grow">
            {wishlistProducts.map((product, orderIndex) => (
                <div key={product.productId} className="flex gap-3 border-b border-primary-light last:border-none mb-3 last:m-0 text-lg" >
                    <Link href={`/product/${product.productId}`} className="aspect-square w-52" >
                        <Image height={520} width={520} src={product.productFirtsImgURL} alt={product.productFirtsImgURL} />
                    </Link>
                    <div className="flex justify-between grow items-center" >
                        <strong>
                            <Link href={`/product/${product.productId}`} >{product.productName}</Link>
                            <span>From   &#8377;{extractMinimumNetValue(product.variants)?.minNetValue || parseInt((product.price - (product.price * (product.discount / 100)))).toLocaleString("en-IN", { useGrouping: true })}</span>
                        </strong>
                        <MdDelete className=" cursor-pointer text-xl" onClick={async () => { await removeProductFromWishlist(product.productId) }} />
                    </div>
                </div>
            ))}
        </div>
    );
};
