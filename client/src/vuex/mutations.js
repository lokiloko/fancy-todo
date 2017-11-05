const mutations = {
  toggleLog(state) {
    if (localStorage.getItem('token')) {
      state.loggedIn = true
    } else {
      state.loggedIn = false
    }
  },
  setUser(state, payload) {
    state.user = payload
  },
  setTodos(state, payload) {
    state.todos = payload
  },
  addTodo(state, payload) {
    state.todos.unshift(payload)
  },
  deleteTodo(state, payload) {
    var index = state.todos.findIndex((element) => {
      if (element._id === payload) {
        return element
      }
    })
    state.todos.splice(index, 1)
  },
  updateTodo(state, payload) {
    var index = state.todos.findIndex((element) => {
      if (element._id === payload._id) {
        return element
      }
    })
    state.todos[index] = payload
  }
}

export default mutations
