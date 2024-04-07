import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUser,
  fetchLoggedInUserOrder,
  updateUser,
} from "./userApi";

const initialState = {
  status: "idle",
  userInfo: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrder",
  async (userId) => {
    const response = await fetchLoggedInUserOrder(userId);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    console.log(response)
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // console.log(response);
    if (response.error) return response.error;
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.userInfo.orders = action.payload;
      })
      .addCase(fetchLoggedInUserOrderAsync.rejected, (state, action) => {
        state.status = "error";
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.error;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action)
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action)
        if (action.payload.status) {
          state.isLoading = false;
          state.isError = false;
          state.error = null;
          state.userInfo = action.payload;
          state.isSuccess = true;
        } else {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.userInfo = null;
          state.error = action.payload.message;
        }
      });
  },
});

export const { setSuccess } = userSlice.actions;
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectedForgotSuccess = (state) => state.user.isSuccess;
export const selectedForgotError = (state) => state.user.error;

export default userSlice.reducer;
