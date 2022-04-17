import Vue from 'vue' // ES6导入方式
import App from './App.vue' // 导入根组件App
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router, // this.$router ===router
  store,
  render: h => h(App) // vue支持的新写法
}).$mount('#app')
