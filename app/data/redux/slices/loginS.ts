import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type StateProp = {
    selectedID: string,
}

export const initialValue: StateProp = {
    selectedID: ''
}


const newsEventsSlice = createSlice({
    name: "newsEventsSlice",
    initialState: initialValue,
    reducers: {
        setSelectedID: (state, action: PayloadAction<string>) => {
            state.selectedID = action.payload
        },
    },
})

export const newsEventsSelector = (state: RootState) => state.newsEventsSlice;
export const { setSelectedID } = newsEventsSlice.actions
export default newsEventsSlice.reducer;