const actions = {
  setUser ({commit}, data) {
    commit('setUser', data)
  },
  setSessionId ({commit}, id) {
    commit('setSessionId', id)
  },
  showLoading ({commit}, status) {
    commit('showLoading', status)
  },
  setArea ({commit}, data) {
    commit('setArea', data)
  },
  setProperty ({commit}, data) {
    commit('setProperty', data)
  }
}
export default actions
