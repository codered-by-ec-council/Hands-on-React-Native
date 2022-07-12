import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import todoReducer from './feature/todo'
import { todoApi } from './feature/todoApi'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware)
})

setupListeners(store.dispatch)