const express = require('express')
const bodyParser = require('body-parser')
const { setTimeout } = require('timers/promises')
const app = express()
app.use(bodyParser.json())

let todoList = [
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

// GET
app.get('/list', async (req, res) => {
  await setTimeout(500)
  res.send(todoList)
})

// POST upsert
app.post('/list/:id?', (req, res) => {
  const id = req.params.id
  const { title, subtitle, description, done } = req.body

  if (!todoList[id]) {
    res.sendStatus(404)
  }

  // if id is not provided create
  if (!id) {
    todoList.push({
      id: Math.random(),
      title,
      subtitle,
      description,
      done: false
    })
  }

  // if id exists update...
  if (id) {
    todoList = todoList.map((todo) => {
      if (todo.id == id) {
        return {
          id,
          title,
          subtitle,
          description,
          done,
        }
      }
      return todo
    })
  }

  res.sendStatus(200)
})

app.delete('/list/:id', (req, res) => {
  const id = req.params.id

  // delete logic
  todoList = todoList.filter((todo)=>{
    if (todo.id == id) return false
    return true
  })

  res.sendStatus(200)
})

app.listen(3009, () => {
  console.log(`Server mock started on port 3009`)
})