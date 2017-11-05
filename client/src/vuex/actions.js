import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const actions = {
  getAllQuestions ({ commit }) {
    http.get('/questions')
    .then(({ data }) => {
      commit('setQuestions', data.data)
    })
    .catch((err) => console.log(err))
  }
}

export default actions
