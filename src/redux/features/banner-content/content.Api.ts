import { baseApi } from "@/redux/api/baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allContent: builder.query({
      query: ({ search }: { search?: string }) => {
        const query = new URLSearchParams();
        if (search) query.append("searchTerm", search);
        return {
          url: `/content/all-content?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["allContent"],
    }),
    singleContent: builder.query({
      query: (slug: string) => ({
        url: `/content/single-content/${slug}`,
        method: "GET",
      }),
      providesTags: ["content"],
    }),
  }),
});

export const { useAllContentQuery, useSingleContentQuery } = contentApi;
