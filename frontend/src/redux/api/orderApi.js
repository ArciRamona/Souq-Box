// Implementing Redux Toolkit

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //

// Fetch all products Query
export const orderApi = createApi({
  // have to create here product API. In this file we will handle all the endpoints related to the product.
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1", // We set up our proxy value that is going to be our backend domain, like localhost port 3004 and now we can use in here /api/v1/products and then that will fetch the data from the backend. So we have to set in here the proxy field in order to connect our application with the backend. So now we have set in here the proxy value that is our localhost port 3004.
    credentials: "include",

    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth?.token;

    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  keepUnusedDataFor: 30,

  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/orders/new",
          method: "POST",
          body,
        };
      },
    }),
    stripeCheckoutSession: builder.mutation({
      // 4 stripe -> cart -> payment Method
      query(body) {
        return {
          url: "/payment/checkout_session",
          method: "POST",
          body,
        };
      },
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: "/orders/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useGetMyOrdersQuery,
} = orderApi; // With this Mutation object in this hook we can use in our component that will give us all the products, the Isloading variable success, variable error variable, every variable that we need.
