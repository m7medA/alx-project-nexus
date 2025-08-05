import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";

export const addUser = createAsyncThunk(
  "signup/addUser",
  async function ({ name, email, password, gender }, { rejectWithValue }) {
    try {
      const { data, error } = await supabase
        .from("user")
        .insert({
          name,
          email,
          password,
          gender,
        })
        .select();

      if (error) {
        console.error("Supabase error details:", error);
        return rejectWithValue(error.message);
      }

      if (!data || data.length === 0) {
        return rejectWithValue("User creation failed - no data returned");
      }

      return data[0];
    } catch (err) {
      console.error("Unexpected error:", err);
      return rejectWithValue(err.message || "Failed to create user account");
    }
  }
);

const initialState = {
  user: [],
  isAuth: false,
  status: "idle",
  error: "",
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        console.log(action.payload);
        const { id, name, email, credit, cart, wishlist, gender } =
          action.payload;
        localStorage.setItem(
          "user",
          JSON.stringify({ id, name, email, credit, cart, wishlist, gender })
        );
        localStorage.setItem("isAuth", "true");
        state.status = "idle";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default signinSlice.reducer;
