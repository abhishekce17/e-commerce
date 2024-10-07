"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { OutlineButton } from './OutlineButton'
import { removeCartItem } from '@/actions/removeItemFromCart'
import { notify } from '@/utils/notify'
import { removeItemAction, setTotalExpenditure, setUpdateStatusAction } from '@/features/user-details/userCartSlice'
import { useDispatch } from 'react-redux'
import { updateCartProduct } from '@/actions/updateCartProduct'

export const CartProductCard = ({ item, savedItem = false }) => {
    const dispatch = useDispatch();
    const [disableBtn, setDisableBtn] = useState(false);

    const handleRemoveItem = async ({ cartProductId, saveForLater = false }) => {
        notify("adding", "loading")
        setDisableBtn(true);
        const response = await removeCartItem({ cartProductId });
        if (response.status === 200) {
            dispatch(removeItemAction({ cartProductId, saveForLater, productPrice: parseInt(((item.price) - (item.price) * (item.discount) / 100) * item.quantity), quantity: item.quantity }));
            notify(response.message, "success");
        } else {
            notify(response.message, "error");
        }
        setDisableBtn(false);
    };


    const updateCart = async ({ type, cartProductId, quantity }) => {
        notify("updating", "loading")
        setDisableBtn(true);
        const response = await updateCartProduct({ type, docId: cartProductId, quantity });
        if (response.status === 200) {
            if (type === "quantity") {
                dispatch(setTotalExpenditure({ cartProductId, productPrice: parseInt(((item.price) - (item.price) * (item.discount) / 100)), quantity }));
            } else if (type === "status") {
                dispatch(setUpdateStatusAction(item))
            }
            notify(response.message, "success");
        } else {
            notify(response.message, "error");
        }
        setDisableBtn(false);
    }


    return (
        <div className="md:flex gap-5 border-b border-primary-light last:border-none items-center p-2">
            <Link href={{ pathname: `/product/${item.productId}`, query: item.variant }} >
                <Image src={item.productFirtsImgURL} width={500} height={500} alt={item.productName} className=" min-w-48 max-w-52 h-full" />
            </Link>
            <div >
                <Link href={{ pathname: `/product/${item.productId}`, query: item.variant }} >
                    <h3>{item.productName}</h3>
                </Link>
                {Object.keys(item.variant).sort().map(key => <p key={key} > {key} : {item.variant[key]}</p>)}
                <p>Price: ₹{item.price.toLocaleString("en-IN", { useGrouping: true })}</p>
                <p>Discount: {item.discount}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Effective Price: ₹{parseInt(((item.price) - (item.price) * (item.discount) / 100) * item.quantity).toLocaleString("en-IN", { useGrouping: true })} </p>
                <div className="flex gap-3 flex-wrap" >
                    {item.saveForLater ?
                        <OutlineButton disabled={disableBtn} onClick={() => updateCart({ type: "status", cartProductId: item.docId })} type="button" label="Move to Cart" className=" rounded-md w-max" />
                        : <>

                            <OutlineButton disabled={disableBtn} onClick={() => item.quantity > 1 && updateCart({ type: "quantity", cartProductId: item.docId, quantity: -1 })} label="-" type="button" className=" rounded-md" />
                            <OutlineButton disabled={disableBtn} onClick={() => updateCart({ type: "quantity", cartProductId: item.docId, quantity: 1 })} type="button" label="+" className=" rounded-md w-max" />
                            <OutlineButton disabled={disableBtn} label="save for later" type="button" onClick={() => updateCart({ type: "status", cartProductId: item.docId })} className=" rounded-md w-max" />
                        </>}
                    <OutlineButton disabled={disableBtn} label="Remove" type="button" onClick={() => handleRemoveItem({ cartProductId: item.docId })} className=" rounded-md w-max" />
                </div>
            </div>
        </div>
    )
}
