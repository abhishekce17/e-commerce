const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    cartProducts: [{
        productFirtsImgURL: "",
        stock: 0,
        averageRating: 0,
        brandName: "",
        dealProduct: true,
        productName: "",
        category: "",
        variants: [],
        price: 0,
        productId: "",
        initialDiscount: 0,
        variant: {},
        discount: 0,
        quantity: 0,
        docId: ""
    }],
    savedItems: [{
        productFirtsImgURL: "",
        stock: 0,
        averageRating: 0,
        brandName: "",
        dealProduct: true,
        productName: "",
        category: "",
        variants: [],
        price: 0,
        productId: "",
        initialDiscount: 0,
        variant: {},
        discount: 0,
        quantity: 0,
        docId: ""
    }],
    totalExpenditure: {
        totalAmount: 0,
        totalQuantity: 0
    }
}

const userCart = createSlice({
    name: "userCart",
    initialState,
    reducers: {
        setCartInitialState: (state, action) => action.payload,
        setUpdateStatusAction: (state, action) => {
            if (action.payload.saveForLater) {
                state.cartProducts.push({ ...action.payload, saveForLater: false })
                state.savedItems = state.savedItems.filter(item => item?.docId != action.payload.docId);
            } else {
                state.cartProducts = state.cartProducts.filter(item => item?.docId != action.payload.docId);
                state.savedItems.push({ ...action.payload, saveForLater: true });
            }
            state.totalExpenditure.totalQuantity += (action.payload.saveForLater ? 1 : -1) * action.payload.quantity;
            state.totalExpenditure.totalAmount += (action.payload.saveForLater ? 1 : -1) * action.payload.quantity * parseInt(((action.payload.price) - (action.payload.price) * (action.payload.discount) / 100));
        },
        setTotalExpenditure: (state, action) => {
            state.cartProducts = state.cartProducts.map(product => product.docId === action.payload.cartProductId ? { ...product, quantity: product.quantity + action.payload.quantity } : product)
            state.totalExpenditure.totalQuantity += action.payload.quantity;
            state.totalExpenditure.totalAmount += action.payload.quantity * action.payload.productPrice;
        },
        removeItemAction: (state, action) => {
            if (action.payload.saveForLater) {
                state.savedItems = state.savedItems.filter(item => item?.docId != action.payload.cartProductId);
            } else {
                state.cartProducts = state.cartProducts.filter(item => item?.docId != action.payload.cartProductId);
                state.totalExpenditure.totalQuantity -= action.payload.quantity;
                state.totalExpenditure.totalAmount -= action.payload.productPrice;
            }
        }
    }
})

export const { setUpdateStatusAction, setTotalExpenditure, setCartInitialState, removeItemAction } = userCart.actions;
export default userCart.reducer;