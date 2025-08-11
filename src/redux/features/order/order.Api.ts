import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderbyUserId: builder.query({
      query: () => ({
        url: "orders",
      }),
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetOrderbyUserIdQuery, useCreateOrderMutation } = orderApi;
