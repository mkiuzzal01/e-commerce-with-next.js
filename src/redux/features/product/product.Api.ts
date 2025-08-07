/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: (queryParams: Record<string, any>) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/product/all-product?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["allProduct"],
    }),

    singleProductBySlug: builder.query({
      query: (slug: string) => ({
        url: `/product/single-product/${slug}`,
        method: "GET",
      }),
      providesTags: ["view-product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["update-product"],
    }),

    allProductByKeyWord: builder.query({
      query: ({
        queryParams = {},
        headerParams = {},
      }: {
        queryParams?: Record<string, any>;
        headerParams?: Record<string, any>;
      }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        const headers: Record<string, string> = {};
        if (headerParams?.params) {
          headers["params"] = JSON.stringify(headerParams.params);
        }

        return {
          url: `/product/product-by-key-word?${queryString}`,
          method: "GET",
          headers,
        };
      },
      providesTags: ["product-by-key-word"],
    }),
  }),
});

export const {
  useAllProductsQuery,
  useSingleProductBySlugQuery,
  useUpdateProductMutation,
  useAllProductByKeyWordQuery,
} = ProductApi;
