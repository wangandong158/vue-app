import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'
import store from '../store'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

router.beforeEach((to, from, next) => {
  // 处理缓存页面
  if(to.meta.keepAlive&&store.getters.catchPages.indexOf(to.name)==-1){
    store.dispatch('setCatchPages',to.name)
  }
  if(to.name.indexOf('authorityPage') < 0){
    if (store.getters.userAccount) {
      next()
    } else {
      next({
        path: '/authorityPage',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else{
    next()
  }
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
