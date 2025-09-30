import { STORAGE_KEYS } from '@/core/config/constants';
import { JobConfigurationModel, PositionLevelModel } from '@/core/types/jobConfigurationModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
export const JobConfigurationAPI = createApi({
    reducerPath: 'JobConfigurationAPI',
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

        //Job Catgory
        getAllCareers: builder.query<JobConfigurationModel, { page: number, limit: number, search?: string }>({
            query: (params) => ({
                url: `/careers`,
                method: "GET",
                params
            })
        }),

        deleteCareers: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `/careers/${id}`,
                method: "DELETE"
            })
        }),
        createCareers: builder.mutation<any, { name: string; description: string }>({
            query: (payload) => ({
                url: `/careers`,
                method: "POST",
                body: payload,
            }),
        }),
        updateCareers: builder.mutation<any, { id: number; name: string; description: string }>({
            query: ({ id, ...payload }) => ({
                url: `/careers/${id}`,
                method: "PUT",
                body: payload,
            }),
        }),


        //Industries
        getAllIndustries: builder.query<JobConfigurationModel, { page: number, limit: number, search?: string }>({
            query: (params) => ({
                url: `/industries`,
                method: "GET",
                params
            })
        }),

        deleteIndustries: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `/industries/${id}`,
                method: "DELETE"
            })
        }),
        createIndustries: builder.mutation<any, { name: string; description: string }>({
            query: (payload) => ({
                url: `/industries`,
                method: "POST",
                body: payload,
            }),
        }),
        updateIndustries: builder.mutation<any, { id: number; name: string; description: string }>({
            query: ({ id, ...payload }) => ({
                url: `/industries/${id}`,
                method: "PUT",
                body: payload,
            }),
        }),


        //Position Level
        getAllPositionLevel: builder.query<PositionLevelModel, { page: number, limit: number, search?: string }>({
            query: (params) => ({
                url: `/positions`,
                method: "GET",
                params
            })
        }),

        deletePositionLevel: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `/positions/${id}`,
                method: "DELETE"
            })
        }),
        createPositionLevel: builder.mutation<any, { title: string; description: string, career_id: number }>({
            query: (payload) => ({
                url: `/positions`,
                method: "POST",
                body: payload,
            }),
        }),
        updatePositionLevel: builder.mutation<any, { id: number; title: string; description: string, career_id: number }>({
            query: ({ id, ...payload }) => ({
                url: `/positions/${id}`,
                method: "PUT",
                body: payload,
            }),
        }),


    })
})
export const {
    useGetAllCareersQuery,
    useGetAllIndustriesQuery,
    useGetAllPositionLevelQuery,
    useDeleteCareersMutation,
    useDeleteIndustriesMutation,
    useDeletePositionLevelMutation,
    useCreateCareersMutation,
    useUpdateCareersMutation,
    useCreateIndustriesMutation,
    useUpdateIndustriesMutation,
    useCreatePositionLevelMutation,
    useUpdatePositionLevelMutation
} = JobConfigurationAPI;