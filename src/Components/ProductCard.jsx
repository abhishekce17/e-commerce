"use client"
import React from 'react'
import { PrimaryButton } from './PrimaryButton'
import Link from 'next/link'
import extractMinimumNetValue from '@/utils/ExtractMinimumNetValue'
import Image from 'next/image'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { OutlineButton } from './OutlineButton'
import { addToWishlist } from '@/actions/addToWishlist'
import { notify } from '@/utils/notify'
import { removeFromWishlist } from '@/actions/removeFromWishlist'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlistAction, removeFromWishlistAction } from '@/features/user-details/userSlice'
import { addToCart } from '@/actions/addToCart'
import { setBuyingProduct } from '@/features/user-details/buyingProductSlice'
import { useRouter } from 'next/navigation'

export const ProductCard = ({ productInfo, href, showButtons = true }) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const isWishlisted = useSelector(state => state.userData.userData.Personal.wishlist).includes(productInfo.productId);

    const productVariantPrice = extractMinimumNetValue(productInfo.variants)

    const hadnleWishlist = async ({ action, productId }) => {
        console.log("adding");
        notify("saving...", "loading")
        if (action === "addToWishlist") {
            const response = await addToWishlist({ productId: productId });
            if (response.status === 200) {
                dispatch(addToWishlistAction({ productId: productId }));
                notify(response.message, "success");
            } else {
                notify(response.message, "error");
            }
        } else if (action === "removeFromWishlist") {
            const response = await removeFromWishlist({ productId: productId });
            if (response.status === 200) {
                dispatch(removeFromWishlistAction({ productId: productId }));
                notify(response.message, "success");
            } else {
                notify(response.message, "error");
            }
        }
    }

    const handleBuyNow = async ({ selectedVariant }) => {
        const subInfo = Object.values(selectedVariant).flatMap((v) => {
            return productInfo.variants.flatMap((x) => {
                const foundType = x.type.find((y) => y.price && y.variant === v);
                return foundType ? [{ ...foundType }] : [];
            });
        });
        const { brandName, category, discount, price, productId, productName } = productInfo;
        dispatch(setBuyingProduct([{ quantity: 1, productFirtsImgURL: productInfo.productFirtsImgURL, brandName, category, discount, price, productId, productName, ...subInfo[0], variant: selectedVariant }]));
        router.push("/place-your-order/order-summary");
    }

    const handleAddToCart = async ({ productId, selectedVariant }) => {
        notify("adding", "loading")
        const response = await addToCart({ productId, variant: selectedVariant, quantity: 1 });
        if (response.status === 200) {
            dispatch(addToWishlistAction({ productId }));
            setInsideCart(true);
            notify(response.message, "success");
        } else {
            notify(response.message, "error");
        }
        setDisableBtn(false);
    }

    return (
        <div className="flex flex-col gap-2 group relative" >
            <Link href={href?.pathname ? { pathname: href.pathname, query: href.query || "" } : href} className="rounded-md overflow-hidden shadow-sm group-hover:shadow-lg" >
                <Image className="aspect-square" width={500} height={500} src={productInfo.productFirtsImgURL} alt={productInfo.productFirtsImgURL} />
            </Link>
            <div className="text-md md:text-lg lg:text-xl font-medium grow h-max" >
                <Link href={href?.pathname ? { pathname: href.pathname, query: href.query || "" } : href} className="grow" >
                    {productInfo.productName}
                </Link>

                <div className="flex justify-between my-1 items-center" >
                    <span className='text-sm' >★ 4.3 (56 reviews)</span>
                    <span>&#8377;{productVariantPrice?.minNetValue || parseInt((productInfo.price - (productInfo.price * (productInfo.discount / 100)))).toLocaleString("en-IN", { useGrouping: true })}</span>
                </div>
            </div>
            {showButtons && <div className='flex justify-between flex-wrap gap-2' >
                {/* <OutlineButton label="Add to cart" onClick={() => handleAddToCart({ productId: productInfo.productId, selectedVariant: productVariantPrice?.obj })} /> */}

                <div className="rounded-3xl overflow-hidden w-fit" >
                    <PrimaryButton label="Buy now" onClick={() => handleBuyNow({ selectedVariant: productVariantPrice?.obj })} />
                </div>
                <span className="text-primary" >
                    {
                        isWishlisted ?
                            <AiFillHeart onClick={() => hadnleWishlist({ action: "removeFromWishlist", productId: productInfo.productId })} />
                            :
                            <AiOutlineHeart onClick={() => hadnleWishlist({ action: "addToWishlist", productId: productInfo.productId })} />
                    }
                </span>
            </div>}
        </div>
    )
}
