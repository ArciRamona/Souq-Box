import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "statsApi", //
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/admin" }),
  endpoints: (builder) => ({
    getSales: builder.query({
      query: ({ startDate, endDate }) =>
        `get_sales?startDate=${startDate}&endDate=${endDate}`,
    }),
  }),
});

export const { useLazyGetSalesQuery } = statsApi;
