import { configureStore } from "@reduxjs/toolkit";
import danhSachSlice from "./danhSachSlice";

export const store = configureStore({
  reducer: { danhSachSlice },
});
