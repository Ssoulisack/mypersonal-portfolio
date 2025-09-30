// features/main/mainSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type StateProp = {
    Counter: number;
    created_at_from: string | null;
    created_at_to: string | null;
    location_name: string;
    career_name: string;
};

const todayIso = new Date().toISOString().slice(0, 10);

export const initialValue: StateProp = {
    Counter: 0,
    created_at_from: todayIso,
    created_at_to: todayIso,
    location_name: "",
    career_name: ""
};

const mainSlice = createSlice({
    name: "mainSlice",
    initialState: initialValue,
    reducers: {
        incremented: (state) => { state.Counter += 1; },
        decremented: (state) => { state.Counter -= 1; },
        setCounter: (state, action: PayloadAction<number>) => { state.Counter = action.payload; },
        setCreatedAtFrom: (state, action: PayloadAction<string | null>) => {
            state.created_at_from = action.payload;
        },
        setCreatedAtTo: (state, action: PayloadAction<string | null>) => {
            state.created_at_to = action.payload;
        },
        setLocationName: (state, action: PayloadAction<string>) => {
            state.location_name = action.payload;
        },
        setCareerName: (state, action: PayloadAction<string>) => {
            state.career_name = action.payload;
        },
    },
});

export const mainSelector = (state: RootState) => state.mainSlice;
export const { incremented, decremented, setCounter, setCreatedAtFrom, setCreatedAtTo, setLocationName,setCareerName } = mainSlice.actions;
export default mainSlice.reducer;
