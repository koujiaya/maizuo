<template>
    <div>
        <button @click="handleOrder">订单</button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-icon name="chat-o" size="40" />
        <van-icon class-prefix="iconfont" name="wode" size="40"/>
        <i class="iconfont icon-xiangxia"></i>
            <van-icon name="chat-o" size="40" />
    </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'vant'
import '@/assets/iconfont/iconfont.css'
Vue.use(Button)
export default {
  methods: {
    handleOrder () {
      this.$router.push('/order')
    }
  },
  // 组件内拦截
  beforeEnter: (to, from, next) => {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
}
</script>
