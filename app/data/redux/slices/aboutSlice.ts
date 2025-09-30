import { STORAGE_KEYS } from '@/core/config/constants';
import { AboutModel } from '@/core/types/aboutModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
export const AboutAPI = createApi({
    reducerPath: 'AboutAPI',
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
        getAboutUs: builder.query<AboutModel, any>({
            query: () => ({
                url: `/public/content?main_content_id=2&type=ABOUT_US`,
                method: "GET"
            })
        }),

    })
})
export const { useGetAboutUsQuery } = AboutAPI;