import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiServices = createApi({
  reducerPath: "apiServices",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
  endpoints: (builder) => ({
    //fetch product detials by id
    getProductByID: builder.query({
      query: (id) => `/${id}`,
    }),

    //fetch array of product id and return array of results
    getProductByIDs: builder.query({
      async queryFn(ids, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          if (!ids || ids.length === 0) {
            return { data: [] };
          }

          const results = await Promise.all(
            ids.map((id) => fetchWithBQ(`/${id}`))
          );

          const error = results.find((res) => res.error);
          if (error) return { error: error.error };

          return { data: results.map((res) => res.data) };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    //get result for query
    getBySearch: builder.query({
      query: (query) => `/search?q=${query}`,
    }),

    //get all categories
    getAllCategories: builder.query({
      query: () => `/categories`,
    }),

    //get all products based on category
    getCategory: builder.query({
      query: (query) => `/category/${query}`,
    }),

    //get products by pagination
    getProductsByPagination: builder.query({
      query: ({ limit, skip }) => `?limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const {
  useGetProductByIDQuery,
  useGetProductByIDsQuery,
  useGetBySearchQuery,
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useGetProductsByPaginationQuery,
} = apiServices;
