<template>
  <div>
    <film-swiper v-if="bannerlist.length" :loop="loop" :autoplay="autoplay">
      <film-swiper-item
        v-for="banner in bannerlist"
        :key="banner.id"
        class="filmswiperitem"
      >
        <img :src="banner.imgUrl" />
      </film-swiper-item>
    </film-swiper>
    <!-- <film-tab :tablist="tablist" class="sticky"></film-tab> -->
    <van-tabs v-model="active" :sticky='true' color='#ff5f16' title-active-color='#ff5f16' title-inactive-color='#191a1b'>
  <van-tab :title="tab.name" v-for='tab in tablist' :to="tab.path" :key=tab.id>
    <router-view></router-view>
    </van-tab>

</van-tabs>

  </div>
</template>
<script>
import filmSwiper from '@/components/films/filmSwiper'
import filmSwiperItem from '@/components/films/filmSwiperItem'
// import filmTab from '@/components/films/filmTab'
import axios from 'axios'
import Vue from 'vue'
import { Tab, Tabs } from 'vant'

Vue.use(Tab)
Vue.use(Tabs)

export default {
  components: {
    filmSwiper,
    filmSwiperItem
    // filmTab
  },
  data () {
    return {
      active: 1,
      loop: true,
      autoplay: true,
      bannerlist: [],
      tablist: [
        {
          id: 1,
          name: '正在热映',
          path: '/films/nowplaying'
        },
        {
          id: 2,
          name: '即将上映',
          path: '/films/comingsoon'
        }
      ]
    }
  },
  mounted () {
    axios.get('/json/banner.json').then((res) => {
      // console.log(res.data)
      this.bannerlist = res.data.banner
    })
  }
}
</script>
<style lang="scss" scoped>
.filmswiperitem {
  img {
    width: 3.75rem;
    height: 2rem;
  }
}
// .sticky {
//   position: sticky;
//   top: 0;
//   z-index: 100;
// }
</style>
