import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchusers } from "../../utils/fetches";

export const authUser = createAsyncThunk(
  "login/authUser",
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const user = await fetchusers(email, password);

      if (!user || user.length === 0) {
        return rejectWithValue("Invalid email or password");
      }

      return user;
    } catch (err) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  isAuth: JSON.parse(localStorage.getItem("isAuth") || false),
  status: "idle",
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },

    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        const { id, name, email, credit, cart, wishlist, gender } =
          action.payload;
        localStorage.setItem(
          "user",
          JSON.stringify({ id, name, email, credit, cart, wishlist, gender })
        );
        localStorage.setItem("isAuth", "true");
        state.status = "idle";
        state.error = "";
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { login, logout, setUserFromStorage } = loginSlice.actions;

export default loginSlice.reducer;
