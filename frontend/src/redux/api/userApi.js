// Implementing Redux Toolkit

// Load Logged In User In State

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //
import { setIsAuthenticated, setUser, setLoading } from "../features/userSlice";

// Fetch all products Query
export const userApi = createApi({
  // have to create here product API. In this file we will handle all the endpoints related to the product.
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include", // We set up our proxy value that is going to be our backend domain, like localhost port 3004 and now we can use in here /api/v1/products and then that will fetch the data from the backend. So we have to set in here the proxy field in order to connect our application with the backend. So now we have set in here the proxy value that is our localhost port 3004.
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user, // Transformresponse a function to manilpulate the data returned by a query or mutation
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched User Data:", data);
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log("Error fetching user:", error);
        }
      },
      providesTags: ["User"],
    }),
    // Update User Profile
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT", // We need to send the user ID in the request body
          body,
          formData: true, // Important for file uploads
        };
      },
      invalidatesTags: ["User"], // This will invalidate the User tag when the mutation is done. So, when we update the user profile, the user data will be updated in the store and the component that uses the getMe query will be re-rendered.
    }),

    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: "/me/upload_avatar",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/password/update",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
} = userApi; // With this Mutation object in this hook we can use in our component that will give us all the products, the Isloading variable success, variable error variable, every variable that we need.
