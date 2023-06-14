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

export const postUser = createAsyncThunk(
  "user/postuser",
  async (
    userData: {
      axiosPrivate: AxiosInstance;
      username: string;
      password: string;
      full_name: string;
      phone_number: string;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, username, password, full_name, phone_number } =
      userData;
    try {
      const newUser = await axiosPrivate.post("/user/user", {
        username,
        password,
        full_name,
        phone_number,
      });
      return newUser.data.rows;
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

export const deleteUserById = createAsyncThunk(
  "user/deleteuserbyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      user_id: number;
    },
    { rejectWithValue }
  ) => {
    const { axiosPrivate, user_id } = data;
    try {
      const response = await axiosPrivate.delete(
        `/user/id/${encodeURIComponent(user_id)}`
      );
      return response.data.rows[0].user_id;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.status);
    }
  }
);

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

export const updateUserById = createAsyncThunk(
  "user/updateuserbyid",
  async (
    data: {
      axiosPrivate: AxiosInstance;
      phone_number: string;
      full_name: string;
      category: string;
      new_password: string;
      user_id: number;
    },
    { rejectWithValue }
  ) => {
    const {
      axiosPrivate,
      phone_number,
      full_name,
      category,
      new_password,
      user_id,
    } = data;
    try {
      const response = await axiosPrivate.put(
        `user/id/${encodeURIComponent(user_id)}`,
        {
          full_name,
          phone_number,
          new_password,
          category,
          user_id,
        }
      );
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
      .addCase(postUser.fulfilled, (state, action) => {
        state.users = [...(state.users || []), action.payload[0]];
        state.loading = false;
        state.error = null;
      })
      .addCase(postUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        const updatedUser = action.payload[0];
        if (state.users) {
          const userIndex = state.users.findIndex(
            (user) => user.user_id === updatedUser.user_id
          );
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
      //deleteUserById
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        const users = state.users;
        let filtered: UserState[] = [];
        if (users) {
          const deletedUserId = action.payload;
          filtered = users.filter(
            (user: UserState) => user.user_id !== deletedUserId
          );
        }
        state.users = filtered;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as number;
      })
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
