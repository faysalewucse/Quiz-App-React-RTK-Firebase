import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
});
