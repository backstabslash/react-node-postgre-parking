import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { bookingSlice } from "./booking";
import { slotSlice } from "./slot";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    booking: bookingSlice.reducer,
    slot: slotSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
