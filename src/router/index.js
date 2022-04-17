import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films'
import Nowplaying from '@/views/films/Nowplaying'
import Comingsoon from '@/views/films/Comingsoon'
import Detail from '@/views/Detail'
import Cinemas from '@/views/Cinemas'
import City from '@/views/City'
import Search from '@/views/Search'
// import Center from '@/views/Center'
// import Order from '@/views/Order'
import Login from '@/views/Login'

import store from '@/store/index'

Vue.use(VueRouter) // 注册路由插件，两个全局 router-view router-link

// 配置表
const routes = [{
  // 重定向
  path: '*',
  redirect: '/films'
  // redirect:{
  //   name:'films'
  // }
},
{
  name: 'films',
  path: '/films',
  component: Films,
  // 嵌套路由
  children: [{
    path: '/films',
    // redirect:'/films/nowplaying'
    redirect: {
      name: 'nowplaying'
    }
  },
  {
    name: 'nowplaying',
    path: '/films/nowplaying',
    component: Nowplaying,
    alias: '/films/now'
  },
  {
    name: 'comingsoon',
    path: '/films/comingsoon',
    component: Comingsoon,
    alias: '/films/soon'
  }
  ]
},
{
  name: 'kouDetail', // 命名路由
  path: '/detail/:id', // 动态路由
  component: Detail,
  meta: {
    isShow: false
  }
},

{
  path: '/cinemas',
  component: Cinemas
},
{
  path: '/city',
  component: City,
  meta: {
    isShow: false
  }

},
{
  path: '/cinemas/search',
  component: Search,
  meta: {
    isShow: false
  }
},
{
  path: '/center',
  component: () => import('@/views/Center'),
  meta: {
    isKouRequired: true
  }
  // 路由独享拦截
  // beforeEnter:(to,from,next)=>{
  //   if(localStorage.getItem('token')){
  //     next()
  //   }
  //   else{
  //     next({
  //        path:'/login',
  //        query:{redirect:to.fullPath}
  //     })
  //   }
  // }
},
{
  path: '/order',
  component: () => import('@/views/Order'),
  meta: {
    isKouRequired: true
  }
},
{
  path: '/login',
  component: Login
}

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 全局拦截
// router.beforeEach((to, from, next) => {
//   console.log('进入', to.meta.isShow)
//   if (to.meta.isShow === false) {
//     // console.log(store)
//     store.commit('hide')
//   } else {
//     store.commit('show')
//   }
//   //   //console.log(to)
//   //   // to.fullpath
//   if (to.meta.isKouRequired) {
//     // 判断 本地存储中是否有token字段
//     if (localStorage.getItem('token')) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
