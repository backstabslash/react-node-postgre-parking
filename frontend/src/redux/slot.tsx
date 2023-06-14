import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";
import axios from "../axios";

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
  async (axiosPrivate: AxiosInstance, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      if (state.auth?.role && state.auth?.role === "connect_user") {
        const response = await axios.get("/auth/slots");
        return response.data.rows;
      } else {
        const response = await axiosPrivate.get(`/parking/parkingslots`, {});
        return response.data.rows;
      }
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const updateSlotById = createAsyncThunk(
  "slot/updateslotbyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      slot_id: number;
      vehicle_category: string;
      price: number;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, slot_id, vehicle_category, price } = data;
    try {
      const response = await axiosPrivate.put(
        `/parking/id/${encodeURIComponent(slot_id)}`,
        { vehicle_category, price }
      );
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const deleteSlotById = createAsyncThunk(
  "slot/deleteslotbyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      slot_id: number;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, slot_id } = data;
    try {
      const response = await axiosPrivate.delete(
        `/parking/id/${encodeURIComponent(slot_id)}`,
        {}
      );
      return slot_id;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const postSlot = createAsyncThunk(
  "slot/postslot",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      vehicle_category: string;
      price: number;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, vehicle_category, price } = data;
    try {
      const response = await axiosPrivate.post("/parking/parkingslot", {
        vehicle_category,
        price,
      });
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // postSlot
      .addCase(postSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSlot.fulfilled, (state, action) => {
        state.slots = [...(state.slots || []), action.payload[0]];
        state.loading = false;
        state.error = null;
      })
      .addCase(postSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.slots = [];
      })
      // updateSlotById
      .addCase(updateSlotById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSlotById.fulfilled, (state, action) => {
        const updatedSlot = action.payload[0];
        const slots = JSON.parse(JSON.stringify(state.slots));
        for (let i = 0; i < slots.length; i++) {
          if (slots[i].slot_id === updatedSlot.slot_id) {
            slots[i] = updatedSlot;
            state.slots = slots;
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateSlotById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.slots = [];
      })
      // deleteSlotById
      .addCase(deleteSlotById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSlotById.fulfilled, (state, action) => {
        const deletedSlotId = action.payload;
        state.slots =
          state.slots?.filter((slots) => slots.slot_id !== deletedSlotId) || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteSlotById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.slots = [];
      })
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
