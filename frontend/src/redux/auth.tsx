import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";

interface AuthState {
  username: string | null;
  accessToken: string | null;
  role: string | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: AuthState = {
  username: null,
  accessToken: null,
  role: "connect_user",
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // register
    [`${register.pending}`]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [`${register.fulfilled}`]: (state) => {
      state.loading = false;
    },
    [`${register.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // login
    [`${login.pending}`]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [`${login.fulfilled}`]: (state, action) => {
      state.loading = false;
      const { username, role, accessToken } = action.payload;
      state.username = username;
      state.role = role;
      state.accessToken = accessToken;
    },
    [`${login.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // logout
    [`${logout.pending}`]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [`${logout.fulfilled}`]: (state) => {
      state.loading = false;
      state.username = state.role = state.accessToken = null;
    },
    [`${logout.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // refresh
    [`${refresh.pending}`]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [`${refresh.fulfilled}`]: (state, action) => {
      state.loading = false;
      const { username, role, accessToken } = action.payload;
      state.username = username;
      state.role = role;
      state.accessToken = accessToken;
    },
    [`${refresh.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
