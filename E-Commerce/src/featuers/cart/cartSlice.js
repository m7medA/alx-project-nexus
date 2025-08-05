import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";

export const updateUserCart = createAsyncThunk(
  "user/updateCart",
  async ({ id, cart }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("user")
      .update({ cart })
      .eq("id", id);

    if (error) return rejectWithValue(error.message);
    return data[0];
  }
);

// safe fallback for user data
const user = JSON.parse(localStorage.getItem("user")) || {};

const initialState = {
  cartProducts: user.cart || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      if (!state.cartProducts.includes(productId)) {
        state.cartProducts.push(productId);

        // sync to localStorage
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user.cart = state.cartProducts;
        localStorage.setItem("user", JSON.stringify(user));
      }
    },

    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (id) => id !== action.payload
      );

      // sync to localStorage
      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.cart = state.cartProducts;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
