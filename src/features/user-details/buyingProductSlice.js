import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
    quantity: 0,
    variant: {},
    productFirtsImgURL: "",
    brandName: "",
    category: "",
    discount: "",
    price: "",
    productId: "",
    productName: ""
}]

const buyingProductSlice = createSlice({
    name: "buyingProduct",
    initialState,
    reducers: {
        setBuyingProduct: (state, action) => [...action.payload],
    },
})

export const { setBuyingProduct } = buyingProductSlice.actions;
export default buyingProductSlice.reducer;