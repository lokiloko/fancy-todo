const mutations = {
  toggleLog (state) {
    if (localStorage.getItem('token')) {
      state.loggedIn = true
    } else {
      state.loggedIn = false
    }
  },
  setQuestions (state, payload) {
    state.questions = payload
  }
}

export default mutations
