// Implementing Redux Toolkit

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //

// Fetch all products Query
export const productApi = createApi({
  // have to create here product API. In this file we will handle all the endpoints related to the product.
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1", // We set up our proxy value that is going to be our backend domain, like localhost port 3004 and now we can use in here /api/v1/products and then that will fetch the data from the backend. So we have to set in here the proxy field in order to connect our application with the backend. So now we have set in here the proxy value that is our localhost port 3004.
  }),
  tagTypes: ["Product"], // Tagging the product and if edit the review no need to reload to appear it will automatically paste into your product review
  keepUnusedDataFor: 30,

  // Define all the endpoints here.
  // Endpoint to get all products. Here we will use redux-toolkit query.
  // The query will fetch the data from the server and put it in the Redux store.

  endpoints: (builder) => ({
    // Define the endpoints here.
    //Endpoint to get all products. Here we will use redux-toolkit query.
    //our endpoint is get products that will get all the products from the back end.
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "price[gte]": params.min,
          "price[lte]": params.max,
          "ratings[gte]": params?.ratings,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"], // Tagging the product and if edit the review no need to reload to appear it will automatically paste into your product review
    }),

    sumbitReview: builder.mutation({
      // submit Review
      query(body) {
        return {
          url: "/reviews", // TODO Seet the routes products.js if same spelling
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),

    canUserReview: builder.query({
      query: (productId) => `/can_review/?productId=${productId}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSumbitReviewMutation,
  useCanUserReviewQuery,
} = productApi; // With this Mutation object in this hook we can use in our component that will give us all the products, the Isloading variable success, variable error variable, every variable that we need.
