import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiServices } from "../services/apiServices";
import cartReducer from "../featuers/cart/cartSlice";
import wishlistReducer from "../featuers/wishlist/wishlistSlice";
import loginReducer from "../featuers/auth/loginSlice";
import signinReducer from "../featuers/auth/signinSlice";

const store = configureStore({
  reducer: {
    [apiServices.reducerPath]: apiServices.reducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    login: loginReducer,
    signin: signinReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiServices.middleware),
});

setupListeners(store.dispatch);

export default store;
