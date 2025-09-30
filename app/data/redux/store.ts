import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import mainSlice from "./slices/mainSlice";
import newsEventsSlice from "./slices/newsEventsSlice";
import roleSlice from "./slices/roleSlice";
import careerSlice from "./slices/careerSlice";
import { CandidatesAPI } from "./slices/recruitmentManage";
import { ApplyJobAPI } from "./slices/applyJobSlice";
import { AboutAPI } from "./slices/aboutSlice";
import { ContactAPI } from "./slices/contactSlice";
import { JobConfigurationAPI } from "./slices/jobConfigurationSlice";
import { DashboardSlice } from "./slices/dashboardSlice";

export const store = configureStore({
    reducer: {
        mainSlice,
        newsEventsSlice,
        roleSlice,
        careerSlice,
        [CandidatesAPI.reducerPath]: CandidatesAPI.reducer,
        [ApplyJobAPI.reducerPath]: ApplyJobAPI.reducer,
        [AboutAPI.reducerPath]: AboutAPI.reducer,
        [ContactAPI.reducerPath]: ContactAPI.reducer,
        [JobConfigurationAPI.reducerPath]: JobConfigurationAPI.reducer,
        [DashboardSlice.reducerPath]: DashboardSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            CandidatesAPI.middleware,
            ApplyJobAPI.middleware,
            AboutAPI.middleware,
            ContactAPI.middleware,
            JobConfigurationAPI.middleware,
            DashboardSlice.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();