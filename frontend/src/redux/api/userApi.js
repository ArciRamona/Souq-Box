// Implementing Redux Toolkit

// Load Logged In User In State

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //
import { setIsAuthenticated, setUser } from "../features/userSlice";

// Fetch all products Query
export const userApi = createApi({
  // have to create here product API. In this file we will handle all the endpoints related to the product.
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include", // We set up our proxy value that is going to be our backend domain, like localhost port 3004 and now we can use in here /api/v1/products and then that will fetch the data from the backend. So we have to set in here the proxy field in order to connect our application with the backend. So now we have set in here the proxy value that is our localhost port 3004.
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      providesTags: ["User"],
      transformResponse: (result) => result.user, // Transformresponse a function to manilpulate the data returned by a query or mutation
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched User Data:", data);
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.log("Error fetching user:", error);
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi; // With this Mutation object in this hook we can use in our component that will give us all the products, the Isloading variable success, variable error variable, every variable that we need.
