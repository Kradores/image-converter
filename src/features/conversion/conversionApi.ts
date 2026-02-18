import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const conversionApiSlice = createApi({
  reducerPath: "conversionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.API_BASE_URL,
    timeout: 60000,
  }),
  endpoints: (builder) => ({
    convertImages: builder.mutation<Blob, FormData>({
      query: (formData) => ({
        url: "/api/convert",
        method: "POST",
        body: formData,
        responseHandler: (response) => response.blob(),
      })
    })
  })
});

export const { useConvertImagesMutation } = conversionApiSlice;