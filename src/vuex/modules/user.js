import Lockr from 'lockr'

const user = {
  state: {},
  mutations: {
    logout (state, vm) {
      Lockr.rm('user')
      Lockr.rm('sessionId')
      window.store.commit('setUser')
      window.store.commit('setSessionId')
      setTimeout(() => {
        window.router.replace('/login')
      }, 1000)
    }
  }
}

export default user
