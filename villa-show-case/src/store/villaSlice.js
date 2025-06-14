import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  villas: [],
  loading: false,
};
const villaSlice = createSlice({
  name: "villa",
  initialState,
  reducers: {
    setVillas: (state, action) => {
      state.villas = action.payload;
    },
    addVilla: (state, action) => {
      state.villas.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setVillas, addVilla, setLoading } = villaSlice.actions;

export default villaSlice.reducer;
