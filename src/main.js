import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import './api/mock'
import Cookie from 'js-cookie'


Vue.use(ElementUI)

//添加一个全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (!token&&to.name!='login') {
    //token不存在，说明当前的用户没有登录，应该跳转到登录的页面
    next({name:'login'})
  } else if (token&&to.name==='login') {//token存在，说明用户已经登录了。此时跳转到首页
    next({name:'home'})
  } else {
    next()
  }
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('addMenu',router)
  }
  
}).$mount('#app')
