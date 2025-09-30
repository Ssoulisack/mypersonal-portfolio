import { STORAGE_KEYS } from '@/core/config/constants';
import { GetAllCandidateTypeListModel } from '@/core/types/GetAllCandidateTypeListModel';
import { GetAllCareerTypeModel } from '@/core/types/GetAllCareerTypeModel';
import { GetAllDashboardModel } from '@/core/types/GetAllDashboardModel';
import { GetAllLocationTypeModel } from '@/core/types/GetAllLocationTypeModel';
import { GetDashboardCandidateModel } from '@/core/types/GetDashboardCandidateModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
export const DashboardSlice = createApi({
    reducerPath: 'DashboardSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${Cookies.get(STORAGE_KEYS.ACCESS_TOKEN) || undefined}`
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllDashboard: builder.query<GetAllDashboardModel, { created_at_from?: string, created_at_to?: string, location_name?: string, career_name?: string }>({
            query: (params) => ({
                url: `/dashboard/by`,
                method: "GET",
                params
            })
        }),
        getDashboardByCandidate: builder.query<GetDashboardCandidateModel, { page: number, limit: number, created_at_from?: string }>({
            query: (params) => ({
                url: `/dashboard/candidate`,
                method: "GET",
                params
            })
        }),
        getLoctinType: builder.query<GetAllLocationTypeModel, any>({
            query: () => ({
                url: `/location`,
                method: "GET"
            })
        }),
        getCarrerNameType: builder.query<GetAllCareerTypeModel, { page: number, limit: number }>({
            query: () => ({
                url: `/careers`,
                method: "GET"
            })
        }),
        getAllCandidateType: builder.query<GetAllCandidateTypeListModel, { page: number, limit: number, created_at_from?: string }>({
            query: (params) => ({
                url: `/dashboard/candidate`,
                method: "GET",
                params
            })
        })
    })
})
export const {
    useGetAllDashboardQuery,
    useGetDashboardByCandidateQuery,
    useGetLoctinTypeQuery,
    useGetCarrerNameTypeQuery,
    useGetAllCandidateTypeQuery
} = DashboardSlice;