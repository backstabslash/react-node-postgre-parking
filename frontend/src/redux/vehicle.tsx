import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";

interface VehicleState {
  vehicle_id: number | null;
  user_id: number | null;
  vehicle_category: string | null;
  plate_number: string | null;
  brand: string | null;
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

export const updateVehicleById = createAsyncThunk(
  "vehicle/updatevehiclebyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      vehicle_id: number;
      vehicle_category: string;
      brand: string;
      plate_number: string;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, vehicle_id, vehicle_category, brand, plate_number } =
      data;
    try {
      const response = await axiosPrivate.put(
        `/vehicle/id/${encodeURIComponent(vehicle_id)}`,
        { vehicle_id, vehicle_category, brand, plate_number }
      );
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const postVehicle = createAsyncThunk(
  "vehicle/postvehicle",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      vehicle_category: string;
      brand: string;
      plate_number: string;
      username: string | null;
    },
    { rejectWithValue, getState }
  ) => {
    const { axiosPrivate, vehicle_category, brand, plate_number } = data;
    let { username } = data;
    const state = getState() as any;
    if (!username) username = state.auth.username;
    try {
      const response = await axiosPrivate.post("/vehicle/vehicle", {
        username,
        plate_number,
        brand,
        vehicle_category,
      });
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const deleteVehicleById = createAsyncThunk(
  "vehicle/deletevehiclebyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      vehicle_id: number;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, vehicle_id } = data;
    try {
      const response = await axiosPrivate.delete(
        `/vehicle/id/${encodeURIComponent(vehicle_id)}`,
        {}
      );
      return vehicle_id;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
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
      })
      // updateVehicleById
      .addCase(updateVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVehicleById.fulfilled, (state, action) => {
        const updatedVehicle = action.payload[0];
        const vehicles = JSON.parse(JSON.stringify(state.vehicles));
        for (let i = 0; i < vehicles.length; i++) {
          if (vehicles[i].vehicle_id === updatedVehicle.vehicle_id) {
            vehicles[i] = updatedVehicle;
            state.vehicles = vehicles;
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.vehicles = [];
      })
      // postVehicle
      .addCase(postVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postVehicle.fulfilled, (state, action) => {
        state.vehicles = [...(state.vehicles || []), action.payload[0]];
        state.loading = false;
        state.error = null;
      })
      .addCase(postVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.vehicles = [];
      })
      // deleteVehicleById
      .addCase(deleteVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVehicleById.fulfilled, (state, action) => {
        const deletedVehicleId = action.payload;
        state.vehicles =
          state.vehicles?.filter(
            (vehicle) => vehicle.vehicle_id !== deletedVehicleId
          ) || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
        state.vehicles = [];
      });
  },
});

export const {} = vehicleSlice.actions;

export default vehicleSlice.reducer;
