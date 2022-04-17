<template>
    <div>
        <button @click="handleLogin">登录</button>
    </div>
</template>
<script>
export default {
  methods: {
    handleLogin () {
      setTimeout(() => {
        localStorage.setItem('token', 'kou')
        // this.$router.back() //返回

        // 1. 获取query字段
        // console.log(this.$route)
        // 2. 跳转到当时想要跳的页面
        this.$router.push(this.$route.query.redirect)
      }, 1000)
    }
  }
}
</script>
