const path = require('path')
const { app, ipcMain } = require('electron')

const DataStore = require('./DataStore')
const Window = require('./Window')

// object for holding the reading item data
const todosData = new DataStore({ name: 'ToRead'})

function main () {
  // Create the browser window.
  let mainWindow = new Window({
      file: path.join('renderer', 'index.html')
  })

  ipcMain.on('renderer_ready', () => {
      mainWindow.webContents.send('todos', todosData.todos)
  })

  ipcMain.on('add-todo', (event, todo, title) => {
      const updatedTodos = todosData.addTodo(todo, title).todos

      mainWindow.send('todos', updatedTodos)
  })

  ipcMain.on('delete-todo', (event, todo) => {
      const updatedTodos = todosData.deleteTodo(todo).todos

      mainWindow.send('todos', updatedTodos)
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
