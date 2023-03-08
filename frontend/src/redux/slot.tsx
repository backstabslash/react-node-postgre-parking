import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios, { axiosPrivate } from "../axios";

interface SlotState {
  slot_id: number | null;
  vehicle_category: string | null;
  status: string | null;
  price: number | null;
}

interface SlotsState {
  slots: SlotState[] | null;
  loading: boolean | null;
  error: number | null;
}

const initialState: SlotsState = {
  slots: [],
  loading: false,
  error: null,
};

export const getSlots = createAsyncThunk(
  "slot/slots",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      if (state.auth?.role && state.auth?.role === "connect_user") {
        const response = await axios.get("/user/slots");
        return response.data.rows;
      } else {
        const response = await axiosPrivate.get("/parking/parkingslots");
        return response.data.rows;
      }
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const slotSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getSlots
      .addCase(getSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSlots.fulfilled, (state, action) => {
        state.loading = false;
        let slots: SlotState[] = [];
        for (let slot of action.payload) slots.push(slot);
        state.slots = slots;
      })
      .addCase(getSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      });
  },
});

export const {} = slotSlice.actions;

export default slotSlice.reducer;
