import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3009' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => `list/`,
            providesTags: ['Todos']
        }),
        upsertTodo: builder.mutation({
            query: ({id, ...body}) => ({
                url: `list/${id?id:''}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({id}) => ({
                url: `list/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']
        })
    })
})

export const { useGetTodosQuery, useUpsertTodoMutation, useDeleteTodoMutation } = todoApi