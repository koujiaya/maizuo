<template>
  <div>
    <section>
      <router-view></router-view>
    </section>
    <!-- <tabbar :tablist ='tablist' ref="mytabbar"></tabbar> -->
    <footer   v-show='isTabbarShow'>
      <van-tabbar
        route
        :fixed="true"
        z-index="200"
        active-color="#ff5f16"
        inactive-color="#797d82"

      >
        <van-tabbar-item
          replace
          :to="tab.path"
          v-for="tab in tablist"
          :key="tab.id"
        >
          <span> {{ tab.name }}</span>
          <template #icon>
            <van-icon class-prefix="iconfont" :name="tab.icon" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>
<script>
// import tabbar from '@/components/Tabbar.vue'
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { mapState } from 'vuex'
import '@/assets/iconfont/iconfont.css'
Vue.use(Tabbar)
Vue.use(TabbarItem)
export default {
  components: {
    // tabbar
  },
  data () {
    return {
      tablist: [
        {
          id: 1,
          name: '电影',
          path: '/films',
          icon: 'dianying'
        },
        {
          id: 2,
          name: '影院',
          path: '/cinemas',
          icon: 'yingyuan'
        },
        {
          id: 3,
          name: '我的',
          path: '/center',
          icon: 'account'
        }
      ]
    }
  },
  computed: {
    ...mapState(['isTabbarShow'])
  },

  mounted () {
    // console.log(this.$refs.mytabbar.$el.offsetHeight)
  }
}
</script>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}
html,
body {
  width: 100%;
  height: 100%;
}
body {
  font-size: 16px;
}
ul,
li {
  list-style: none;
}
section {
  position: relative;
  padding-bottom: 0.5rem;
}
</style>
