<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
    class="film-list"
  >
    <van-cell
        class="film-list-item"
      v-for="film in filmlist"
      :key="film.filmId"
      @click="handleChangePage(film.filmId)"
    >
     <div class="film-list-info">
          <div class="film-img">
            <img :src="film.poster" />
          </div>
          <div class="film-info">
            <div class="film-name ellipsis">
              <span class="name"> {{ film.name }}</span>
              <span class="type">{{ film.filmType.name }}</span>
            </div>
            <div
              class="film-grade ellipsis"
              :style="{ display: film.grade ? 'block' : 'none' }"
            >
              <span class="label">观众评分&nbsp;</span>
              <span class="grade">{{ film.grade }}</span>
            </div>
            <div class="film-actors ellipsis">
              <span class="label">主演:&nbsp;{{ film.actors | actorsFilter }}</span>
            </div>
            <div class="film-detail">
              <span class="label"
                >{{ film.nation }}&nbsp;|&nbsp;{{ film.runtime }}分钟</span
              >
            </div>
          </div>
          <div class="film-buy" :class="[
          type === 1 ? 'isSale' : '',
          type===2 && film.isPresale===true?'isPresale':''
          ]">
           {{computedType}}
          </div>
     </div>
    </van-cell>
  </van-list>
</template>
<script>
import http from '@/utils/http'
import Vue from 'vue'
import { List, cell } from 'vant'
import { mapState } from 'vuex'

Vue.use(cell)
Vue.use(List)

Vue.filter('actorsFilter', (data) => {
  // console.log(data.map(item => item.name).join(' '))
  if (data === undefined) return '暂无主演'
  return data.map((item) => item.name).join(' ')
})
export default {
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      filmlist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  methods: {
    onLoad () {
      console.log('到底了')
      if (this.filmlist.length === this.total && this.total !== 0) {
        this.finished = true
      }

      this.current++

      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=${this.type}&k=7246811`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        // console.log(res.data.data)
        // this.filmlist.push(...res.data.data.films)
        this.filmlist = [...this.filmlist, ...res.data.data.films]
        this.loading = false
      })
    },
    handleChangePage (id) {
      // console.log(id)
      // 编程式导航
      //  location.href='/#/detail'

      // 1-通过路径跳转
      // this.$router.push(`/detail/${id}`)

      // 2-通过命名路由跳转
      this.$router.push({
        name: 'kouDetail',
        params: {
          id
        }
      })
    }
  },
  computed: {
    ...mapState(['cityId']),
    computedType () {
      return this.type === 1 ? '购票' : '预购'
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=${this.type}&k=7246811`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res.data.data)
      this.filmlist = res.data.data.films
      this.total = res.data.data.total
    })
  }
}
</script>
<style lang="scss" scoped>
.film-list {
  width: 3.75rem;
  .film-list-item{
    height: 0.94rem;
    padding: 0 0.15rem;
    margin-bottom: 0.15rem;

    .film-list-info{
        display: flex;
         justify-content: flex-start;
        align-items: center;

    .film-img {
      width: 0.66rem;
      height: 0.94rem;
      float: left;
      img {
        width: 100%;
      }
    }
    .film-info {
      float: left;
      width: calc(100% - 1.31rem);
      padding: 0 0.1rem;
      .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      .label {
        font-size: 13px;
        margin-top: 4px;
        color: #797d82;
      }
      .film-name {
        .name {
          max-width: calc(100% - 0.25rem);
          color: #191a1b;
          height: 22px;
          line-height: 22px;
          margin-right: 0.05rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
        }
        .type {
          font-size: 9px;
          color: #fff;
          background: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 0.02rem;
          border-radius: 2px;
        }
      }
      .film-grade {
        .grade {
          color: #ffb232;
          font-size: 14px;
        }
      }
    }
    .film-buy {
        margin-left:1px;
      line-height: 0.25rem;
      height: 0.25rem;
      width: 0.5rem;
      font-size: 13px;
      text-align: center;
      border-radius: 2px;
      display: none;
    }
    .isSale {
       color: #ff5f16;
      border: 1px solid #ff5f16;
       display: block;
    }
        .isPresale {
       color:  #ffb232;
      border: 1px solid  #ffb232;
       display: block;
    }

  }
  }
}

</style>
