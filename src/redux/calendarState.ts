import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  daysInCalendar: (string | null)[];
  activeDay: string;
  month: string;
  year: string;
}

const initialState: CalendarState = {
  daysInCalendar: [],
  activeDay: String(new Date().getDate()).padStart(2, "0"), // new Date().getDate(),
  month: String(new Date().getMonth() + 1).padStart(2, "0"), //new Date().getMonth(),
  year: String(new Date().getFullYear()), // new Date().getFullYear(),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDaysInCalendar(state, action: PayloadAction<(string | null)[]>) {
      state.daysInCalendar = action.payload;
    },
    setActiveDay(state, action: PayloadAction<string>) {
      state.activeDay = action.payload;
    },
    setMonth(state, action: PayloadAction<string>) {
      state.month = action.payload;
    },

    setYear(state, action: PayloadAction<string>) {
      state.year = action.payload;
    },
  },
});
export const { setYear, setMonth, setActiveDay, setDaysInCalendar } =
  calendarSlice.actions;
export default calendarSlice.reducer;
