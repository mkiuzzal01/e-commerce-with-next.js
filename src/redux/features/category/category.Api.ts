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
      providesTags: ["single-main-category"],
    }),
    singleCategory: builder.query({
      query: (slug: string) => ({
        url: `/category/single-category/${slug}`,
        method: "GET",
      }),
      providesTags: ["single-category"],
    }),
    singleSubCategory: builder.query({
      query: (slug: string) => ({
        url: `/category/single-sub-category/${slug}`,
        method: "GET",
      }),
      providesTags: ["single-sub-category"],
    }),
  }),
});

export const {
  useAllMainCategoryQuery,
  useSingleMainCategoryQuery,
  useSingleCategoryQuery,
  useSingleSubCategoryQuery,
} = categoryApi;
