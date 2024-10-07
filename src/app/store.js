import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from "@/features/user-details/userSlice";
import buyingProductReducer from "@/features/user-details/buyingProductSlice";
import cartProductReducer from "@/features/user-details/userCartSlice";

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        buyingProduct: buyingProductReducer,
        userCart: cartProductReducer
    },
});
