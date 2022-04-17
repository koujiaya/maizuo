import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/utils/http'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

Vue.config.devtools = true

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer (state) {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // state 公共状态
  state: {
    cityId: 110100,
    cityName: '北京',
    cinemaList: [],
    isTabbarShow: true
  },
  // getters: {
  // },
  // 统一管理，被devtools 记录状态的修改

  // 只支持同步，不支持异步
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
      // console.log(cityName)
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinemaData (state) {
      state.cinemaList = []
    },
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }

  },

  // 支持异步和同步
  actions: {
    getCinemaData (store, cityId) {
      // console.log('getCinemaData -action')
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=7425667`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        // console.log(res.data.data.cinemas)

        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  }
  // modules: {
  // }
})

// vuex 管理保存公共状态，（分散在各个组件内的状态，统一管理）

// 注意
// vue 默认是管理在内存 一刷新页面，公共状态就丢失了
// vue持久化 -todo

/*
  1. 非父子组件的通信
  2. 后端数据的缓存快照，减少重复数据请求，减轻服务器压力，提高用户体验
*/
