const Store = require('electron-store')

class DataStore extends Store {
  constructor (settings) {
    super(settings)

    // initialize with todos or empty array
    this.todos = this.get('read_items') || []
  }

  saveTodos () {
    // save todos to JSON file
    this.set('read_items', this.todos)

    return this
  }

  getTodos () {
    // set object's todos to todos in JSON file
    this.todos = this.get('read_items') || []

    return this
  }

  addTodo (new_url, new_title) {
    if (new_title === "") {
      new_title = 'New Link'
    }

    const new_item = {
      url: new_url,
      title: new_title
    }
    this.todos = [ ...this.todos, new_item ]

    return this.saveTodos()
  }

  deleteTodo (target_url) {
    this.todos = this.todos.filter(i => i.url !== target_url)

    return this.saveTodos()
  }
}

module.exports = DataStore