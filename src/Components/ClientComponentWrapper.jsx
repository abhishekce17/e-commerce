"use client"
import { setCartInitialState } from '@/features/user-details/userCartSlice';
import { setUserData } from '@/features/user-details/userSlice';
import React from 'react'
import { useDispatch } from 'react-redux';

export default function ClientComponentWrapper({ userData, userCart, children }) {
    const dispatch = useDispatch();
    if (userCart) dispatch(setCartInitialState({
        cartProducts: userCart.Cart,
        savedItems: userCart.savedItems,
        totalExpenditure: { totalAmount: userCart.totalAmount, totalQuantity: userCart.totalItems }
    }));
    if (userData) dispatch(setUserData(userData));

    return (
        <div className="grow" >
            {children}
        </div>
    )
}
