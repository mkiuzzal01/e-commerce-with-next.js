/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allOrderByKeyWord: builder.query({
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
          url: `/order/all-order-by-key-word?${queryString}`,
          method: "GET",
          headers,
        };
      },
      providesTags: ["all-order-by-key-word"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),
    }),
    orderStatusChange: builder.mutation({
      query: ({ id, orderStatus }) => ({
        url: `/order/change-status/${id}`,
        method: "PATCH",
        body: { orderStatus },
      }),
    }),
  }),
});

export const {
  useAllOrderByKeyWordQuery,
  useCreateOrderMutation,
  useOrderStatusChangeMutation,
} = orderApi;
