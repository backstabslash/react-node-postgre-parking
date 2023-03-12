import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";
import axios from "../axios";

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
  guestBookings: GuestBookingState[] | null;
  bookings: BookingState[] | null;
  loading: boolean | null;
  error: number | null;
}

const initialState: BookingsState = {
  guestBookings: [],
  bookings: [],
  loading: false,
  error: null,
};

export const getGuestBookings = createAsyncThunk(
  "booking/guestbookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/bookings");
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const getClientBookings = createAsyncThunk(
  "booking/clientbookings",
  async (axiosPrivate: AxiosInstance, { rejectWithValue, getState }) => {
    const state = getState() as any;
    try {
      const response = await axiosPrivate.get(
        `/booking/username/${encodeURIComponent(state.auth.username)}`,
        {}
      );
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const postBooking = createAsyncThunk(
  "booking/postbooking",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      start_date: Date;
      end_date: Date;
      vehicle_id: number;
      slot_id: number;
      amount_due: number;
    },
    { rejectWithValue }
  ) => {
    const {
      axiosPrivate,
      start_date,
      end_date,
      vehicle_id,
      amount_due,
      slot_id,
    } = data;
    try {
      const response = await axiosPrivate.post("/booking/booking", {
        start_date,
        end_date,
        vehicle_id,
        amount_due,
        slot_id,
      });
      return response.data.rows;
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
      // getGuestBookings
      .addCase(getGuestBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGuestBookings.fulfilled, (state, action) => {
        state.loading = false;
        let guestBookings: GuestBookingState[] = [];
        for (let booking of action.payload) {
          booking.start_date = booking.start_date.substring(0, 10);
          booking.end_date = booking.end_date.substring(0, 10);
          guestBookings.push(booking);
        }
        state.guestBookings = guestBookings;
      })
      .addCase(getGuestBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      });
  },
});

export const {} = bookingSlice.actions;

export default bookingSlice.reducer;
