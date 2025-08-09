import { baseApi } from "../api/baseApi";

const variantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVariants: builder.query({
      query: () => ({
        url: "/variant/all-variant",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllVariantsQuery } = variantApi;
