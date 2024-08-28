import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendarState";
import userSlice from "./userState";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
