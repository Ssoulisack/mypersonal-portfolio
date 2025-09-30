import { STORAGE_KEYS } from '@/core/config/constants';
import { AssignCandidateModel } from '@/core/types/AssignCandidateModel';
import { BodyFormAnswerModel } from '@/core/types/BodyFormAnswerModel';
import { candidateByIdModel } from '@/core/types/candidateByIdModel';
import { CandidateModel } from '@/core/types/candidateModel';
import { GetAllFormTypeModel } from '@/core/types/getAllFormTypeModel';
import { GetAllGenerateLinkModel } from '@/core/types/getAllGenerateLinkModel';
import { GetAllQeustionFormModel } from '@/core/types/GetAllQeustionFormModel';
import { GetWhoImIModel } from '@/core/types/GetWhoImIModel';
import { JobPostingModel } from '@/core/types/jobPostingModel';
import { positionCandidateModel } from '@/core/types/positionCandidateModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
export const CandidatesAPI = createApi({
    reducerPath: 'CandidatesAPI',
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
        createCandidate: builder.mutation<any, { body: FormData }>({
            query: ({ body }) => ({
                url: `/candidates`,
                method: "POST",
                body,
                formData: true,
            }),
        }),
        getAllCandidates: builder.query<CandidateModel, { page: number, limit: number, location_id?: number, career_id?: number, industries_id?: number, position_id?: number, status: string, search?: string, sort?: string }>({
            query: (params) => ({
                url: `/candidates`,
                method: "GET",
                params
            })
        }),
        getAllPosition: builder.query<positionCandidateModel, { page: number, limit: number }>({
            query: (params) => ({
                url: `/positions`,
                method: "GET",
                params
            })
        }),
        getAllJobPosting: builder.query<JobPostingModel, { page: number, limit: number }>({
            query: (params) => ({
                url: `/job/posts`,
                method: "GET",
                params
            })
        }),
        getRoleAssign: builder.query<AssignCandidateModel, any>({
            query: () => ({
                url: `/rbac/role/all`,
                method: "GET"
            })
        }),
        createAssignCandidate: builder.mutation<any, { body: { role_id: number, candidate_id: number[] } }>({
            query: ({ body }) => ({
                url: `/candidate/assignment`,
                method: "POST",
                body
            }),
        }),
        rejectCandidate: builder.mutation<any, { id: number, body: { remark: string } }>({
            query: ({ body, id }) => ({
                url: `/candidate/assignment/reject/${id}`,
                method: "PUT",
                body
            }),
        }),
        getCandidatesById: builder.query<candidateByIdModel, { id: number }>({
            query: ({ id }) => ({
                url: `/candidates/${id}`,
                method: "GET"
            })
        }),
        getAllForm: builder.query<GetAllFormTypeModel, { page: number, limit: number, search?: string, type?: string }>({
            query: (params) => ({
                url: `/form-question-templates/all`,
                method: "GET",
                params
            })
        }),
        createGenerateLink: builder.mutation<any, { id: number, body: { type: string, assign_ids: string[] } }>({
            query: ({ body, id }) => ({
                url: `/interview-forms/${id}`,
                method: "POST",
                body
            })
        }),
        getAllGenerateLinkById: builder.query<GetAllGenerateLinkModel, { id: number }>({
            query: ({ id }) => ({
                url: `/interview-forms/candidate/${id}`,
                method: "GET"
            })
        }),
        getFormQuestionById: builder.query<GetAllQeustionFormModel, { id: number }>({
            query: ({ id }) => ({
                url: `/form-questions/${id}`,
                method: "GET"
            })
        }),
        createFormAnswer: builder.mutation<any, { body: BodyFormAnswerModel }>({
            query: ({ body }) => ({
                url: `/form-answers`,
                method: "POST",
                body
            })
        }),
        createFormTemplate: builder.mutation<any, { body: FormData }>({
            query: ({ body }) => ({
                url: `/form-question-templates`,
                method: "POST",
                body,
                formData: true,
            }),
        }),
        getWhoImI: builder.query<GetWhoImIModel, any>({
            query: () => ({
                url: `/whoami`,
                method: "GET"
            })
        }),
        deleteFormTemplate: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `/form-question-templates/${id}`,
                method: "DELETE"
            })
        }),
        updateFormTemplate: builder.mutation<any, { id: number, body: FormData }>({
            query: ({ body, id }) => ({
                url: `/form-question-templates/${id}`,
                method: "PUT",
                body,
                formData: true,
            }),
        }),
        createSentBack: builder.mutation<any, { body: { ca_id: number[], status: boolean, remark: string } }>({
            query: ({ body }) => ({
                url: `/candidate/assignment/sendback`,
                method: "PUT",
                body
            })
        }),
        updateStatusCandidate: builder.mutation<any, { id: number, status: string }>({
            query: (params) => ({
                url: `/candidates/status`,
                method: "PUT",
                params
            })
        }),
    })
})
export const {
    useGetAllCandidatesQuery,
    useGetAllPositionQuery,
    useGetAllJobPostingQuery,
    useCreateCandidateMutation,
    useGetRoleAssignQuery,
    useCreateAssignCandidateMutation,
    useRejectCandidateMutation,
    useGetCandidatesByIdQuery,
    useGetAllFormQuery,
    useCreateGenerateLinkMutation,
    useGetAllGenerateLinkByIdQuery,
    useGetFormQuestionByIdQuery,
    useCreateFormAnswerMutation,
    useCreateFormTemplateMutation,
    useGetWhoImIQuery,
    useDeleteFormTemplateMutation,
    useUpdateFormTemplateMutation,
    useCreateSentBackMutation,
    useUpdateStatusCandidateMutation
} = CandidatesAPI;