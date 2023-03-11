import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";

interface DiscountState {
  discount_id: number | null;
  user_id: number | null;
  percentage: number | null;
  start_date: Date | null;
  end_date: Date | null;
}

interface DiscountsState {
  discounts: DiscountState[] | null;
  loading: boolean | null;
  error: number | null;
}

const initialState: DiscountsState = {
  discounts: [],
  loading: false,
  error: null,
};

export const getDiscounts = createAsyncThunk(
  "discount/discounts",
  async (axiosPrivate: AxiosInstance, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/discount/discounts");
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const getDiscountsByUsername = createAsyncThunk(
  "discount/discountsbyusername",
  async (axiosPrivate: AxiosInstance, { rejectWithValue, getState }) => {
    const state = getState() as any;
    try {
      const response = await axiosPrivate.get(
        `/discount/username/${encodeURIComponent(state.auth.username)}`,
        {}
      );
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const discountSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getDiscounts
      .addCase(getDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        let discounts: DiscountState[] = [];
        for (let discount of action.payload) discounts.push(discount);
        state.discounts = discounts;
      })
      .addCase(getDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      });
  },
});

export const {} = discountSlice.actions;

export default discountSlice.reducer;
