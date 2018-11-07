// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import Lockr from 'lockr'
import Routers from './router'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Util from './libs/util'
import 'nprogress/nprogress.css'
import { Button, Table } from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(VueRouter)

Vue.component('Button', Button)
Vue.component('Table', Table)

Vue.config.productionTip = false

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  NProgress.start()
  Util.title(to.meta.title)
  let userInfo = Lockr.get('user')
  let sessionId = Lockr.get('sessionId')
  if (!to.meta.isCheck) {
    next()
  } else if (userInfo) {
    if (JSON.stringify(store.state.user) === '{}') {
      store.commit('setUser', userInfo)
      store.commit('setSessionId', sessionId)
    }
    next()
  } else {
    next({
      name: 'login'
    })
  }
})

router.afterEach(() => {
  NProgress.done()
  window.scrollTo(0, 0)
})

window.router = router
window.store = store
window.bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
