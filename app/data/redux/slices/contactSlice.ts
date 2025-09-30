import { STORAGE_KEYS } from '@/core/config/constants';
import { AboutModel } from '@/core/types/aboutModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
export const ContactAPI = createApi({
    reducerPath: 'ContactAPI',
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
        getContact: builder.query<AboutModel, { id: number, type: string }>({
            query: ({ id, type }) => ({
                url: `/public/content?main_content_id=${id}&type=${type}`,
                method: "GET"
            })
        }),

    })
})
export const { useGetContactQuery } = ContactAPI;