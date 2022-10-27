import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addQuizModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    controlAddQuizModal(state) {
      state.addQuizModal = !state.addQuizModal;
    },
  },
});

export const { controlAddQuizModal } = modalSlice.actions;
export default modalSlice.reducer;
