import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { bookingSlice } from "./booking";
import { slotSlice } from "./slot";
import { vehicleSlice } from "./vehicle";
import { discountSlice } from "./discount";
import { userSlice } from "./user";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    booking: bookingSlice.reducer,
    slot: slotSlice.reducer,
    vehicle: vehicleSlice.reducer,
    discount: discountSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
