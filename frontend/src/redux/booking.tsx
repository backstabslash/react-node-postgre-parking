import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface BookingsState {
  bookings: Array<Object>;
}

const initialState: BookingsState = {
  bookings: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<BookingState>) => {
      const {
        booking_id,
        vehicle_id,
        slot_id,
        start_date,
        end_date,
        status,
        amount_due,
        amount_paid,
        remarks,
      } = action.payload;
      const newBooking = {
        booking_id,
        vehicle_id,
        slot_id,
        start_date,
        end_date,
        status,
        amount_due,
        amount_paid,
        remarks,
      };
      return {
        ...state,
        bookings: [...state.bookings, newBooking],
      };
    },
  },
});

export const { setBookings } = bookingSlice.actions;

export default bookingSlice.reducer;
