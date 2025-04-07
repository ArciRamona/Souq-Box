// Implementing Redux Toolkit

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //
import { userApi } from "./userApi";
import { setCredentials, setLoading, setUser } from "../features/authSlice.js";
import { logoutUser } from "../features/authSlice.js";
// Fetch all products Query
export const authApi = createApi({
  // have to create here product API. In this file we will handle all the endpoints related to the product.
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1", // We set up our proxy value that is going to be our backend domain, like localhost port 3004 and now we can use in here /api/v1/products and then that will fetch the data from the backend. So we have to set in here the proxy field in order to connect our application with the backend. So now we have set in here the proxy value that is our localhost port 3004.
  }),

  // Define all the endpoints here.
  // Endpoint to get all products. Here we will use redux-toolkit query.
  // The query will fetch the data from the server and put it in the Redux store.

  endpoints: (builder) => ({
    // Define the endpoints here.
    //Endpoint to get all products. Here we will use redux-toolkit query.
    //our endpoint is get products that will get all the products from the back end.
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
      // Load logged in Users State
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setCredentials({
              user: data.user,
              token: data.token,
            })
          );

          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log("Login error:", error);
        }
      },
    }),

    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // ✅ Store token and user temporarily
          dispatch(
            setCredentials({
              user: data.user,
              token: data.token,
            })
          );

          // ✅ Then fetch full user info (in case token is valid but not complete)
          const { data: user } = await dispatch(
            userApi.endpoints.getMe.initiate(null)
          ).unwrap();
          dispatch(setUser(user));
        } catch (error) {
          dispatch(setLoading(false));
          console.log("Login error:", error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutUser()); // ✅ Clear Redux state
        } catch (error) {
          console.log("Logout error:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi; // With this Mutation object in this hook we can use in our component that will give us all the products, the Isloading variable success, variable error variable, every variable that we need.
