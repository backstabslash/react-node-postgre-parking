import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";

interface VehicleState {
  vehicle_id: number | null;
  user_id: number | null;
  vehicle_category: string | null;
  plate_number: string | null;
  brand: string | null;
  value?: string | null;
  label?: string | null;
  isDisabled?: boolean | null;
}

interface VehiclesState {
  vehicles: VehicleState[] | null;
  loading: boolean | null;
  error: number | null;
}

const initialState: VehiclesState = {
  vehicles: [],
  loading: false,
  error: null,
};

export const getVehicles = createAsyncThunk(
  "vehicle/vehicles",
  async (axiosPrivate: AxiosInstance, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/vehicle/vehicles");
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const getVehiclesByUsername = createAsyncThunk(
  "vehicle/vehiclesbyusername",
  async (axiosPrivate: AxiosInstance, { rejectWithValue, getState }) => {
    const state = getState() as any;
    try {
      const response = await axiosPrivate.get(
        `/vehicle/username/${encodeURIComponent(state.auth.username)}`,
        {}
      );
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    updateVehiclesForBooking: (state, action) => {
      state.vehicles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getVehicles
      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.vehicles = [];
      })
      // getVehiclesByUsername
      .addCase(getVehiclesByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehiclesByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(getVehiclesByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.vehicles = [];
      });
  },
});

export const { updateVehiclesForBooking } = vehicleSlice.actions;

export default vehicleSlice.reducer;
