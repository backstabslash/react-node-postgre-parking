import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";
import { useDispatch } from "react-redux";
import { updateUsername, updatePhoneNumber, updateFullName } from "./auth";

interface UserState {
  user_id: number | null;
  username: string | null;
  password: string | null;
  full_name: string | null;
  phone_number: string | null;
  category: string | null;
}

interface UsersState {
  users: UserState[] | null;
  loading: boolean | null;
  error: number | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk(
  "user/users",
  async (axiosPrivate: AxiosInstance, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/user/users");
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const updateUserByUsername = createAsyncThunk(
  "user/updateuserbyusername",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      username: string;
      new_username: string;
      phone_number: string;
      full_name: string;
      password: string;
      new_password: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    const {
      axiosPrivate,
      username,
      new_username,
      phone_number,
      full_name,
      password,
      new_password,
    } = data;
    try {
      const response = await axiosPrivate.put(
        `user/username/${encodeURIComponent(username)}`,
        {
          username,
          new_username,
          phone_number,
          full_name,
          password,
          new_password,
        }
      );
      dispatch(updateUsername(new_username));
      dispatch(updatePhoneNumber(phone_number));
      dispatch(updateFullName(full_name));
      return response.data.rows;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

export const userSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        let users: UserState[] = [];
        for (let user of action.payload) users.push(user);
        state.users = users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
