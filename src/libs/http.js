import Lockr from 'lockr'
import Qs from 'qs'
import util from './util'

const apiMethods = {
  methods: {
    apiGet (url, data) {
      return new Promise((resolve, reject) => {
        if (url.indexOf('?') > -1) {
          url = url + '&' + Qs.stringify(data)
        } else {
          url = url + '?' + Qs.stringify(data)
        }
        util.ajax.get(url, data).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
          util.closeGlobalLoading()
          window.bus.$Message.warning('请求超时，请检查网络')
        })
      })
    },
    apiPost (url, data) {
      return new Promise((resolve, reject) => {
        util.ajax.post(url, Qs.stringify(data)).then((response) => {
          resolve(response.data)
        }).catch((response) => {
          console.log('f', response)
          resolve(response)
          window.bus.$Message.warning('请求超时，请检查网络')
        })
      })
    },
    apiDelete (url, id) {
      return new Promise((resolve, reject) => {
        util.ajax.delete(url + id).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
          util.closeGlobalLoading()
          window.bus.$Message.warning('请求超时，请检查网络')
        })
      })
    },
    apiPut (url, id, obj) {
      return new Promise((resolve, reject) => {
        util.ajax.put(url + id, obj).then((response) => {
          resolve(response.data)
        }, (response) => {
          util.closeGlobalLoading()
          window.bus.$Message.warning('请求超时，请检查网络')
          reject(response)
        })
      })
    },
    handelResponse (res, cb, errCb) {
      this.closeLoading()
      if (res.code === 200) {
        cb(res.data)
      } else {
        if (typeof errCb === 'function') {
          errCb()
        }
        this.handleError(res)
      }
    },
    handleError (res) {
      if (res.status) {
        window.bus.$Message.error(res.detail)
      } else {
        console.log('default error')
      }
    },
    resetCommonData (data) {
      Lockr.set('user', data) // 用户信息
      Lockr.set('sessionId', data.token) // 用户sessionid
      this.$store.commit('setUser', data)
      this.$store.commit('setSessionId', data.token)
      setTimeout(() => {
        util.closeGlobalLoading()
        window.router.replace('/')
      }, 1000)
    }
  },
  computed: {
    showLoading () {
      return this.$store.state.globalLoading
    }
  }
}

export default apiMethods
