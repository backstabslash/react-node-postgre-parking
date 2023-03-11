import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";

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
