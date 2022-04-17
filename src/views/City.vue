<template>
  <div class="city">
    <van-nav-bar @click-left="handleLeft">
      <template #title>
        <div>当前城市 - {{ cityName }} -</div>
      </template>
      <template #left>
        <van-icon name="cross" size="20" color="#000" />
      </template>
    </van-nav-bar>
    <van-search
      v-model="value"
      placeholder="请输入城市名或拼音"
      background="#f4f4f4"
      :clearable='true'
    />
    <hot-city :hotcitylist="hotcitylist" @event="handleClick"></hot-city>

    <van-index-bar :index-list="computedList" @select="handleChange">
      <div v-for="group in citylist" :key="group.type">
        <van-index-anchor :index="group.type" />
        <van-cell
          :title="city.name"
          v-for="city in group.list"
          :key="city.cityId"
          @click="handleClick(city)"
        />
      </div>
    </van-index-bar>
    <div class="city-search" :style="{display:computedCityList.length===allcitylist.length?'none':'block'}">

        <ul v-if="computedCityList.length">
          <li v-for="city in computedCityList" :key="city.cityId" @click="handleClick(city)">
            {{ city.name }}
          </li>
        </ul>
        <div v-else class='result-empty'>
          <van-icon name="cross" size="90"/>
          <p>没有找到匹配的城市</p>
        </div>
      </div>

  </div>
</template>
<script>
import http from '@/utils/http'
import Vue from 'vue'
import { IndexBar, IndexAnchor, Toast, Search, NavBar, Icon } from 'vant'
import { mapState, mapMutations } from 'vuex'
import hotCity from '@/components/city/hotCity.vue'
import obj from '@/utils/mixinObj'

Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Toast)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
export default {
  components: {
    hotCity
  },
  mixins: [obj],
  data () {
    return {
      citylist: [],
      hotcitylist: [],
      allcitylist: [],
      value: ''
    }
  },
  methods: {
    ...mapMutations(['changeCityName', 'changeCityId', 'show', 'hide']),
    renderCity (List) {
      // console.log(List)
      const citylist = []
      const letterlist = []
      for (let i = 65; i < 91; i++) {
        letterlist.push(String.fromCharCode(i))
      }
      // console.log(letterList)
      letterlist.forEach((letter) => {
        const newlist = List.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        // console.log(newlist)
        newlist.length > 0 &&
          citylist.push({
            type: letter,
            list: newlist
          })
      })
      // console.log(citylist)
      return citylist
    },
    hotCity (List) {
      // console.log(List.filter((item) => item.isHot === 1))
      return List.filter((item) => item.isHot === 1)
    },
    handleChange (index) {
      // console.log(index)
      Toast({
        message: index,
        duration: 1000
      })
    },
    handleClick (city) {
      // console.log(city.name, city.cityId)

      // 传统的多页面方案
      // 1. location.href = '/cinemas?cityname=' + city.name
      // 2. cookie, localStorage

      // 单页面方案
      //  1.中间人模式
      // 2.事件总线 $on $emit

      // vuex 状态管理模式
      // console.log(this.$store.state.cityName)
      //   this.$store.state.cityName = city.name
      //   this.$store.state.cityId = city.cityId

      this.changeCityName(city.name)
      this.changeCityId(city.cityId)

      this.$router.back()
    },
    handleLeft () {
      this.$router.back()
    }
  },
  computed: {
    ...mapState(['cityName']),
    computedList () {
      return this.citylist.map((item) => item.type)
    },
    computedCityList () {
      return this.allcitylist.filter((item) => item.name.includes(this.value) || item.pinyin.includes(this.value))
    }
  },
  mounted () {
    // this.hide()
    http({
      url: '/gateway?k=6097724',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      console.log(res.data.data.cities)
      this.allcitylist = res.data.data.cities
      this.citylist = this.renderCity(res.data.data.cities)
      this.hotcitylist = this.hotCity(res.data.data.cities)

      // console.log(this.allcitylist.filter(item => item.name.includes(this.value)))
      // console.log(this.citylist)

      // 1. 数据 => 按ABC 进行分组
      // 2 转化后的数组，结合组件库进行页面渲染
    })
  },
  destroyed () {
    // this.show()
  }
}
</script>
<style lang="scss">
.van-toast--html,
.van-toast--text {
  width: -webkit-fit-content;
  width: fit-content;
  font-size: 30px;
  min-width: 60px;
  min-height: 60px;
  padding: 8px 12px;
}
.city {
  .city-search {
    z-index: 1999;
    position: fixed;
    top: 100px;
    left: 0;
    background-color: #fff;
    height: calc(100vh - 49px);
    width: 100vw;
    overflow-y: auto;
    ul {
      padding-left: 15px;
      padding-top: 15px;
      li {
        height: 44px;
        position: relative;
        line-height: 44px;
        color: #191a1b;
        font-size: 13px;
      }
    }
    .result-empty{
          position: absolute;
    top: 107px;
    width: 100%;
    text-align: center;
    p{
          color: #bdc0c5;
    font-size: 14px;
    margin: 0;
    }
    }
  }
}
</style>
