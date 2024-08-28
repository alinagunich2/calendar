import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  daysInCalendar: (number | null)[];
  activeDay: number;
  month: number;
  year: number;
}
console.log("cраб");

const initialState: CalendarState = {
  daysInCalendar: [],
  activeDay: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDaysInCalendar(state, action: PayloadAction<(number | null)[]>) {
      state.daysInCalendar = action.payload;
    },
    setActiveDay(state, action: PayloadAction<number>) {
      state.activeDay = action.payload;
    },
    setMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
    },

    setYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },
  },
});
export const { setYear, setMonth, setActiveDay, setDaysInCalendar } =
  calendarSlice.actions;
export default calendarSlice.reducer;
