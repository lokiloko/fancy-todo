import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const actions = {
  getUsersData ({ commit }) {
    http.get('/users/' + localStorage.getItem('token'))
    .then(({ data }) => {
      commit('setUser', data.data)
    })
    .catch((err) => console.log(err))
  },
  getUsersTodo ({ commit }) {
    http.get('/todos/' + localStorage.getItem('token'))
    .then(({ data }) => {
      commit('setTodos', data.data)
    })
    .catch((err) => console.log(err))
  }
}

export default actions
