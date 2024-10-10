import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: {
        Account: {
            agreedTermAndCondition: false,
            email: ''
        },
        OrderDetails: [{
            productId: "",
            productName: "",
            productFirtsImgURL: "",
            variant: "",
            quantity: "",
            paymentMethod: "",
            timestamp: "",
            expectedDeliveryDate: "",
            price: "",
            deliveryStatus: ""
        }],
        Personal: {
            address: {
                area: '',
                city: '',
                state: '',
                pincode: '',
                landmark: '',
                house_no: ''
            },
            fullName: '',
            contact: { email: '', phoneNo: '' },
            wishlist: []
        },
        Cart: [
            {
                productId: '',
                quantity: 1,
                variant: {}
            }
        ]
    },
    status: "idle"
}


export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = { ...initialState.userData, ...action.payload };
        },
        addToWishlistAction: (state, action) => {
            state.userData.Personal.wishlist.push(action.payload.productId)
        },
        removeFromWishlistAction: (state, action) => {
            state.userData.Personal.wishlist = state.userData.Personal.wishlist.filter(productId => productId !== action.payload.productId)
        },
        addToCartAction: (state, action) => {
            state.userData.Cart.push(action.payload);
        },
        removerFromCartAction: (state, action) => {
            state.userData.Cart = state.userData.Cart.filter(product => "" !== action.payload.productId);
        }
    }
})



export const { setUserData, addToWishlistAction, removeFromWishlistAction, removerFromCartAction, addToCartAction } = userSlice.actions;
export default userSlice.reducer;