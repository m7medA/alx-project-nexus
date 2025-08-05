import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";

export const updateUserWishlist = createAsyncThunk(
  "user/updateUserWishlist",
  async ({ id, wishlist }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("user")
      .update({ wishlist })
      .eq("id", id);

    if (error) return rejectWithValue(error.message);
    return data[0];
  }
);

// safe fallback for user data
const user = JSON.parse(localStorage.getItem("user")) || {};

const initialState = {
  wishlistIds: user.wishlist || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.wishlistIds.includes(productId)) {
        state.wishlistIds.push(productId);

        // sync to localStorage
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user.wishlist = state.wishlistIds;
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistIds = state.wishlistIds.filter(
        (id) => id !== action.payload
      );

      // sync to localStorage
      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.wishlist = state.wishlistIds;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
