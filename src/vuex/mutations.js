const mutations = {
  setUser (state, data) {
    state.user = data
  },
  setSessionId (state, id) {
    state.sessionId = id
  },
  showLoading (state, status) {
    state.globalLoading = status
  },
  setArea (state, data) {
    state.area = data
  },
  setProperty (state, data) {
    state.property = data
  }
}
export default mutations
