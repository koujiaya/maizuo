<template>
  <div>
    <van-nav-bar
      title="影院"
      ref="navbar"
      @click-left="handleLeft"
      @click-right="handleRight"

    >
      <template #left>
        {{ cityName }}<van-icon name="arrow-down" size="16" color="#000" />
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#000" />
      </template>
    </van-nav-bar>
    <cinema-list
      :cinemalist="cinemaList"
      :height="height"
    ></cinema-list>
  </div>
</template>
<script>
// import http from '@/utils/http'

import Vue from 'vue'
import { NavBar, Icon } from 'vant'
import cinemaList from '@/components/cinemas/cinemaList.vue'
import { mapState, mapMutations } from 'vuex'

Vue.use(Icon)
Vue.use(NavBar)

export default {
  components: {
    cinemaList
  },
  data () {
    return {
      height: '0px'
    }
  },
  methods: {
    ...mapMutations(['clearCinemaData']),
    handleLeft () {
      this.$router.push('/city')
      // 清空cinemalist
      this.clearCinemaData()
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  },
  computed: {
    ...mapState(['cityName', 'cinemaList'])
  },
  mounted () {
    // 动态计算高度
    // console.log(this.height)
    // console.log(this.$refs.navbar)
    this.height =
      document.documentElement.clientHeight -
      this.$refs.navbar.$el.offsetHeight -
      document.querySelector('footer').offsetHeight +
      'px'
  }
}
</script>
