import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import villaReducer from "./villaSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    villa: villaReducer,
  },
});
