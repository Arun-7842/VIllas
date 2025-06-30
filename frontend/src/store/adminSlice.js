import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  mobile: "",
  token: "",
  isLoggedIn: false,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.mobile = action.payload?.mobile;
      state.token = action.payload?.token;
      state.isLoggedIn = true;
    },
    logoutAdmin: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.mobile = "";
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setAdminDetails, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
