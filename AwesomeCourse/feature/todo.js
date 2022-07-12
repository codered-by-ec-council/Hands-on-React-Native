import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [
    {
      id: 1,
      title: "Doing a React Native course",
      subtitle: "This is very important",
      description: "Complete this awesome course as soon as possible and make more courses!",
      done: false
    },
    {
      id: 2,
      title: "Buying eggs",
      done: false
    },
    {
      id: 3,
      title: "Feed the cat",
      done: true
    },

    // { id: 4, title: "Doing a React Native course", done: false },
    // { id: 5, title: "Buying eggs", done: false },
    // { id: 6, title: "Feed the cat", done: true },

    // { id: 7, title: "Doing a React Native course", done: false },
    // { id: 8, title: "Buying eggs", done: false },
    // { id: 9, title: "Feed the cat", done: true },

    // { id: 10, title: "Doing a React Native course", done: false },
    // { id: 11, title: "Buying eggs", done: false },
    // { id: 12, title: "Feed the cat", done: true },

    // { id: 13, title: "Doing a React Native course", done: false },
    // { id: 14, title: "Buying eggs", done: false },
    // { id: 15, title: "Last item", done: false },
  ]
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.value = [...state.value, {
        id: Math.random(),
        title: action.payload.title,
        subtitle: action.payload.subtitle,
        description: action.payload.description,
        done: false,
      }]
    },
    updateTodo: (state, action) => {
      state.value = state.value.map((todo)=>{
        if (todo.id === action.payload.id) {
          return {
            id: todo.id,
            title: action.payload.title,
            subtitle: action.payload.subtitle,
            description: action.payload.description,
            done: todo.done,
          }
        }
        return todo
      })
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter((todo)=>{
        if (todo.id === action.payload.id) return false
        return true
      })
    },
    toggleDone: (state, action) => {
      state.value = state.value.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            done: !todo.done
          }
        }
        return todo
      })
    }
  }
})

export const { addTodo, updateTodo, toggleDone, deleteTodo } = todoSlice.actions

export default todoSlice.reducer