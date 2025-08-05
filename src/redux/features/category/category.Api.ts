import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allMainCategory: builder.query({
      query: ({ search }: { search?: string }) => {
        const query = new URLSearchParams();
        if (search) query.append("searchTerm", search);
        return {
          url: `/category/all-main-category?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["allMainCategory"],
    }),
    singleMainCategory: builder.query({
      query: (slug: string) => ({
        url: `/category/single-main-category/${slug}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useAllMainCategoryQuery, useSingleMainCategoryQuery } =
  categoryApi;
