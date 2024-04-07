import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut } from "./authApi";

const initialState = {
  loggedInUser: null,
  status: "idle",
  userChecked: false,
  isLoading: false,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    if (response.error) return response.error;
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    if (response.error) return response.error;
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk("auth/signOut", async (userId) => {
  const response = await signOut(userId);
  return response.data;
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        if (action.payload.status) {
          state.error = null;
          state.loggedInUser = action.payload;
        } else {
          state.loggedInUser = null;
          state.error = action.payload.message;
        }
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        // console.log(action)
        if (action.payload.status) {
          state.error = null;
          state.loggedInUser = action.payload;
        } else {
          state.loggedInUser = null;
          state.error = action.payload.message;
        }
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.isLoading = false;
        state.loggedInUser = null;
      });
  },
});

export const selectedLoggedInUser = (state) => state.auth.loggedInUser;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectedError = (state) => state.auth.error;

export default authSlice.reducer;
