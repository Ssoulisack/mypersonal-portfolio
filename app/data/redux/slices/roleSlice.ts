import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

type SelectedUserData = {
    id: number;
    username: string;
    email: string;
    emp_no: string;
    phone: string;
    role_id: number;
    image: string | null;
  };
  

type StateProp = {
    isOpenAd: boolean,
    isOpenUp: boolean,
    updateUserID: number | null,
    selectID: number | null,
    roleTab:string
    selectedUserData: SelectedUserData | null;
}

export const initialValue: StateProp = {
    isOpenAd: false,
    isOpenUp: false,
    updateUserID:null,
    roleTab:"",
    selectID: null,
    selectedUserData: null
}


const roleSlice = createSlice({
    name: "roleSlice",
    initialState: initialValue,
    reducers: {
       
        setIsOpenAd: (state, action: PayloadAction<boolean>) => {
            state.isOpenAd = action.payload
        },
        setIsOpenUp: (state, action: PayloadAction<boolean>) => {
            state.isOpenUp = action.payload
        },
        setUpdateUserID: (state, action: PayloadAction<number>) => {
            state.updateUserID = action.payload
        },
        setSelectID: (state, action: PayloadAction<number>) => {
            state.selectID = action.payload
        },
        setRoleTab: (state, action: PayloadAction<string>) => {
            state.roleTab = action.payload
        },
        setSelectedUserData: (state, action: PayloadAction<SelectedUserData | null>) => {
            state.selectedUserData = action.payload;
          }
    },
})

export const roleSelector = (state: RootState) => state.roleSlice;
export const { setIsOpenAd, setIsOpenUp, setUpdateUserID, setRoleTab, setSelectID,  setSelectedUserData} = roleSlice.actions
export default roleSlice.reducer;