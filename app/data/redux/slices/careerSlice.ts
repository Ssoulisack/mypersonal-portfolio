import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type StateProp = {
  showDetails: boolean;
  careerId: number;
};

export const initialValue: StateProp = {
  showDetails: false,
  careerId: 0,
};

const careerSlice = createSlice({
  name: "careerSlice",
  initialState: initialValue,
  reducers: {
    setShowDetails: (state, action: PayloadAction<boolean>) => {
      state.showDetails = action.payload;
    },
    setCareerId: (state, action: PayloadAction<number>) => {
      state.careerId = action.payload;
    },
  },
});

export const careerSelector = (state: RootState) => state.careerSlice;
export const { setShowDetails, setCareerId } = careerSlice.actions;
export default careerSlice.reducer;
