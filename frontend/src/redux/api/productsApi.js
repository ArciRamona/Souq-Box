import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //

export const productApi = createApi({
  // have to create here product API. In this file we will handle all the endpoints related to the product.
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),

  endpoints: (builder) => ({
    //our endpoint is get products that will get all the products from the back end.
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi; // With this Mutation object in this hook we can use in our component that will give us all the products, the Isloading variable success, variable error variable, every variable that we need.
