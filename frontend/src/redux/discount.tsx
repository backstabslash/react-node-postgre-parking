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

export const postDiscount = createAsyncThunk(
  "discount/postdiscount",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      start_date: Date;
      end_date: Date;
      percentage: number;
      user_id: number;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, start_date, end_date, percentage, user_id } = data;
    try {
      const response = await axiosPrivate.post("/discount/discount", {
        start_date,
        end_date,
        percentage,
        user_id,
      });
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const putDiscountById = createAsyncThunk(
  "discount/updatediscountbyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      end_date: Date;
      percentage: number;
      discount_id: number;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, end_date, percentage, discount_id } = data;
    try {
      const response = await axiosPrivate.put(
        `/discount/id/${encodeURIComponent(discount_id)}`,
        {
          end_date,
          percentage,
          discount_id,
        }
      );
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const deleteDiscountById = createAsyncThunk(
  "discount/deletediscountbyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      discount_id: number;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, discount_id } = data;
    try {
      const response = await axiosPrivate.delete(
        `/discount/id/${encodeURIComponent(discount_id)}`,
        {}
      );
      return discount_id;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // deleteBookingById
      .addCase(deleteDiscountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiscountById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const deletedDiscountId = action.payload;
        state.discounts =
          state.discounts?.filter(
            (discount) => discount.discount_id !== deletedDiscountId
          ) || [];
      })
      .addCase(deleteDiscountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      // postBooking
      .addCase(postDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.discounts = [...(state.discounts || []), action.payload[0]];
      })
      .addCase(postDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
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
      })
      // getDiscountsByUsername
      .addCase(getDiscountsByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiscountsByUsername.fulfilled, (state, action) => {
        state.loading = false;
        let discounts: DiscountState[] = [];
        for (let discount of action.payload) discounts.push(discount);
        state.discounts = discounts;
      })
      .addCase(getDiscountsByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      // putDiscountByID
      .addCase(putDiscountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putDiscountById.fulfilled, (state, action) => {
        const updatedDiscount = action.payload[0];
        const discounts = JSON.parse(JSON.stringify(state.discounts));
        for (let i = 0; i < discounts.length; i++) {
          if (discounts[i].discount_id === updatedDiscount.discount_id) {
            discounts[i] = updatedDiscount;
            state.discounts = discounts;
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(putDiscountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.discounts = [];
      });
  },
});

export const {} = discountSlice.actions;

export default discountSlice.reducer;
