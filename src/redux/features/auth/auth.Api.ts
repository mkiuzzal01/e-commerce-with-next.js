import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    update: builder.mutation({
      query: (id, ...data) => ({
        url: `/user/update-user/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    getProfileBySlug: builder.query({
      query: (slug: string) => ({
        url: `/user/single-user/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateMutation,
  useGetProfileBySlugQuery,
} = authApi;
