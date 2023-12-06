import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderApi";

const initialState = {
  status: "idle",
  orders: [],
};

export const createOrderAsync = createAsyncThunk(
  "cart/createOrder",
  async (item) => {
    const response = await createOrder(item);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
      });
  },
});



export default orderSlice.reducer;