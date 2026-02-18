import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const conversionApiSlice = createApi({
  reducerPath: "conversionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    timeout: 60000,
  }),
  endpoints: (builder) => ({
    convertImages: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "api/convert",
        method: "POST",
        body: formData,
        responseHandler: (response) => response.blob(),
      }),

      async transformResponse(response: Blob) {
        const url = window.URL.createObjectURL(response)

        const link = document.createElement("a")
        link.href = url
        link.download = "converted.zip"
        document.body.appendChild(link)
        link.click()
        link.remove()

        window.URL.revokeObjectURL(url)
      },
    })
  })
});

export const { useConvertImagesMutation } = conversionApiSlice;