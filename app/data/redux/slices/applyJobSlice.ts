import { STORAGE_KEYS } from '@/core/config/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
export const ApplyJobAPI = createApi({
    reducerPath: 'ApplyJobAPI',
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
        applyJob: builder.mutation<any, { body: FormData }>({
            query: ({ body }) => ({
                url: `/candidate/register`,
                method: "POST",
                body,
                formData: true,
            }),
        }),

    })
})
export const { useApplyJobMutation } = ApplyJobAPI;