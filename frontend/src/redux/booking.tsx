import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios, { axiosPrivate } from "../axios";

interface BookingState {
  booking_id: number | null;
  vehicle_id: number | null;
  slot_id: number | null;
  start_date: Date | null;
  end_date: Date | null;
  status: string | null;
  amount_due: number | null;
  amount_paid: number | null;
  remarks: string | null;
}

interface GuestBookingState {
  slot_id: number | null;
  start_date: Date | null;
  end_date: Date | null;
}

interface BookingsState {
  bookings: (BookingState | GuestBookingState)[] | null;
  loading: boolean | null;
  error: number | null;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

export const getBookings = createAsyncThunk(
  "booking/bookings",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      if (state.auth?.role && state.auth?.role === "connect_user") {
        const response = await axios.get("/user/bookings");
        return response.data.rows;
      } else {
        const response = await axiosPrivate.get("/booking/bookings");
        return response.data.rows;
      }
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getBookings
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        let bookings: (BookingState | GuestBookingState)[] = [];
        for (let booking of action.payload) {
          booking.start_date = booking.start_date.substring(0, 10);
          booking.end_date = booking.end_date.substring(0, 10);
          bookings.push(booking);
        }
        state.bookings = bookings;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      });
  },
});

export const {} = bookingSlice.actions;

export default bookingSlice.reducer;
