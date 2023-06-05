import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../axios";

interface AuthState {
  username: string | null;
  accessToken: string | null;
  role: string | null;
  loading: boolean | null;
  error: number | null;
  fullName: string | null;
  phoneNumber: string | null;
}

const initialState: AuthState = {
  username: null,
  accessToken: null,
  role: "connect_user",
  fullName: null,
  phoneNumber: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: {
      username: string;
      password: string;
      full_name: string;
      phone_number: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.post("/user/sign_up", {
        username: userData.username,
        password: userData.password,
        full_name: userData.full_name,
        phone_number: userData.phone_number,
      });
    } catch (err) {
      console.log(err);
      const error = err as AxiosError;
      return rejectWithValue({
        status: error.response?.status,
        error: error.response?.data,
      });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    userData: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "/user/sign_in",
        { username: userData.username, password: userData.password },
        { withCredentials: true }
      );
      response.data.username = userData.username;
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("user/refresh", {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/user/sign_out", {
        withCredentials: true,
      });
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    updateFullName: (state, action) => {
      state.fullName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        const { status } = action.payload as any;
        state.error = status as number;
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const { username, role, accessToken, fullName, phoneNumber } =
          action.payload;
        state.username = username;
        state.role = role;
        state.accessToken = accessToken;
        state.fullName = fullName;
        state.phoneNumber = phoneNumber;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.username = state.role = state.accessToken = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      // refresh
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        const { username, role, accessToken, fullName, phoneNumber } =
          action.payload;
        state.username = username;
        state.role = role;
        state.accessToken = accessToken;
        state.fullName = fullName;
        state.phoneNumber = phoneNumber;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      });
  },
});

export const { updateUsername, updatePhoneNumber, updateFullName } =
  authSlice.actions;

export default authSlice.reducer;
