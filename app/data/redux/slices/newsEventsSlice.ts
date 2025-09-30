import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type StateProp = {
    selectedID: string,
    updateID: number | null; // ✅ here
    deleteID: string;
    isOpen: boolean,
    isOpenUp: boolean,
    newsEventId: number;
    showDetails: boolean;
}

export const initialValue: StateProp = {
    selectedID: '',
    isOpen: false,
    isOpenUp: false,
    updateID: null,
    deleteID: '',
    newsEventId: 0,
    showDetails: false
}


const newsEventsSlice = createSlice({
    name: "newsEventsSlice",
    initialState: initialValue,
    reducers: {
        setSelectedID: (state, action: PayloadAction<string>) => {
            state.selectedID = action.payload
        },
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },
        setIsOpenUp: (state, action: PayloadAction<boolean>) => {
            state.isOpenUp = action.payload
        },
        setUpdateID: (state, action: PayloadAction<number | null>) => {
            state.updateID = action.payload; // ✅ set the ID here
        },
        setDeleteID: (state, action: PayloadAction<string>) => {
            state.deleteID = action.payload; // ✅ set the ID here
        },
        setNewsEventId: (state, action: PayloadAction<number>) => {
            state.newsEventId = action.payload
        },
        setShowDetails: (state, action: PayloadAction<boolean>) => {
            state.showDetails = action.payload;
        },
    },
})

export const newsEventsSelector = (state: RootState) => state.newsEventsSlice;
export const { setSelectedID, setIsOpen, setUpdateID, setIsOpenUp, setDeleteID, setNewsEventId, setShowDetails } = newsEventsSlice.actions
export default newsEventsSlice.reducer;