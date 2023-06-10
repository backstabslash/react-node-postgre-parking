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
      const response = await axios.get("/auth/bookings");
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

export const updateBookingById = createAsyncThunk(
  "booking/updatebookingbyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      start_date: Date;
      end_date: Date;
      status: string;
      amount_due: number;
      amount_paid: number;
      remarks: string;
      booking_id: number;
    },
    { rejectWithValue }
  ) => {
    const {
      axiosPrivate,
      start_date,
      end_date,
      status,
      amount_due,
      amount_paid,
      remarks,
      booking_id,
    } = data;
    try {
      const response = await axiosPrivate.put(
        `/booking/id/${encodeURIComponent(booking_id)}`,
        {
          start_date,
          end_date,
          status,
          amount_due,
          amount_paid,
          remarks,
          booking_id,
        }
      );
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
      // postBooking
      .addCase(postBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        let start_date = new Date(
          action.payload[0].start_date.substring(0, 10)
        );
        let end_date = new Date(action.payload[0].end_date.substring(0, 10));
        start_date.setDate(start_date.getDate() + 1);
        end_date.setDate(end_date.getDate() + 1);
        action.payload[0].start_date = start_date
          .toISOString()
          .substring(0, 10);
        action.payload[0].end_date = end_date.toISOString().substring(0, 10);
        state.bookings = [...(state.bookings || []), action.payload[0]];
      })
      .addCase(postBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      // getGuestBookings
      .addCase(getGuestBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGuestBookings.fulfilled, (state, action) => {
        state.loading = false;
        let guestBookings: GuestBookingState[] = [];
        for (let booking of action.payload) {
          let start_date = new Date(booking.start_date.substring(0, 10));
          let end_date = new Date(booking.end_date.substring(0, 10));
          start_date.setDate(start_date.getDate() + 1);
          end_date.setDate(end_date.getDate() + 1);
          booking.start_date = start_date.toISOString().substring(0, 10);
          booking.end_date = end_date.toISOString().substring(0, 10);
          guestBookings.push(booking);
        }
        state.guestBookings = guestBookings;
      })
      .addCase(getGuestBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      // getClientBookings
      .addCase(getClientBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientBookings.fulfilled, (state, action) => {
        state.loading = false;
        let bookings: BookingState[] = [];
        for (let booking of action.payload) {
          let start_date = new Date(booking.start_date.substring(0, 10));
          let end_date = new Date(booking.end_date.substring(0, 10));
          start_date.setDate(start_date.getDate() + 1);
          end_date.setDate(end_date.getDate() + 1);
          booking.start_date = start_date.toISOString().substring(0, 10);
          booking.end_date = end_date.toISOString().substring(0, 10);
          bookings.push(booking);
        }
        state.bookings = bookings;
      })
      .addCase(getClientBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      // updateBookingById
      .addCase(updateBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingById.fulfilled, (state, action) => {
        const updatedBooking = action.payload[0];
        let start_date = new Date(updatedBooking.start_date.substring(0, 10));
        let end_date = new Date(updatedBooking.end_date.substring(0, 10));
        start_date.setDate(start_date.getDate() + 1);
        end_date.setDate(end_date.getDate() + 1);
        updatedBooking.start_date = start_date.toISOString().substring(0, 10);
        updatedBooking.end_date = end_date.toISOString().substring(0, 10);
        const bookings = JSON.parse(JSON.stringify(state.bookings));
        for (let i = 0; i < bookings.length; i++) {
          if (bookings[i].booking_id === updatedBooking.booking_id) {
            bookings[i] = updatedBooking;
            state.bookings = bookings;
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.bookings = [];
      });
  },
});

export const {} = bookingSlice.actions;

export default bookingSlice.reducer;
