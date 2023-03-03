import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  accessToken: string | null;
  role: string;
}

const initialState: AuthState = {
  username: null,
  accessToken: null,
  role: "connect_user",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      const { username, accessToken, role } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
      state.role = role;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
