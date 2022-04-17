<template>
  <div v-if="filmInfo" >
    <detail-navbar v-scroll='50' >
     <span> {{ filmInfo.name }}</span>
    </detail-navbar>
    <div class="film">
      <div
        class="film-poster"
        :style="{
          backgroundImage: 'url(' + filmInfo.poster + ')',
        }"
        @click="handlePreview( [filmInfo.poster],0)"
      ></div>
      <div class="film-detail">
        <div class="col">
          <div class="film-name">
            <span class="name">{{ filmInfo.name }}</span>
            <span class="type">{{ filmInfo.filmType.name }}</span>
          </div>
          <div class="film-grade" :style="{visibility:filmInfo.grade?'visible':'hidden'}">
            <span class="grade">
              {{ filmInfo.grade }}
            </span>
            <span class="grade-text">分</span>
          </div>
        </div>
        <div class="film-category grey-text">
          {{ filmInfo.category }}
        </div>
        <div class="film-premiere-time grey-text">
          {{ filmInfo.premiereAt | dateFilter }}上映
        </div>
        <div class="film-nation-runtime grey-text">
          {{ filmInfo.nation }}&nbsp;|&nbsp;{{ filmInfo.runtime }}分钟
        </div>
        <div
          class="film-synopsis grey-text"
          :class="[hidden === true ? 'hidden' : 'visiblity']"

        >
          {{ filmInfo.synopsis }}
        </div>
        <div
          class="toggle"
          :class="[hidden === false ? 'upper' : '']"
          @click='hidden=!hidden'
        >
          <i class="iconfont icon-xiangxia"></i>
        </div>
      </div>

      <div class="actors">
        <div class="actors-title">
          <span class="actors-title-text">演职人员</span>
        </div>
        <div class="actors-list" >
          <detail-swiper :slidesPerView='4' name='actors'>
            <detail-swiper-item
              v-for="(actor, index) in filmInfo.actors"
              :key="index"
            >
              <div
                class="actors-img"
                :style="{
                  backgroundImage: 'url(' + actor.avatarAddress + ')',
                }"
                 @click="handlePreview(computedActor,index)"
              ></div>
              <div class="actors-name ellipsis">{{ actor.name }}</div>
              <div class="actors-role">{{ actor.role }}</div>
            </detail-swiper-item>
          </detail-swiper>
        </div>
      </div>

      <div class="photos">
        <div class="photos-title">
          <span class="photos-title-text">剧照</span>
          <span class="photos-to-all">全部({{filmInfo.photos.length}})
            <i class="iconfont icon-more"></i>
          </span>
        </div>
        <div class="photos-list">
          <detail-swiper :slidesPerView='2' name='photos'>
            <detail-swiper-item
              v-for="(photo, index) in filmInfo.photos"
              :key="index"
            >
              <div
                class="photos-img"
                :style="{
                  backgroundImage: 'url(' + photo + ')',
                }"
                  @click="handlePreview(filmInfo.photos,index)"
              ></div>
            </detail-swiper-item>
          </detail-swiper>
        </div>
      </div>

      <div class="goSchedule">选座购票</div>
    </div>
  </div>
</template>
<script>
import '../assets/iconfont/iconfont.css'
import http from '@/utils/http'
import obj from '@/utils/mixinObj'
import moment from 'moment'
import detailSwiper from '@/components/detail/detailSwiper'
import detailSwiperItem from '@/components/detail/detailSwiperItem'
import detailNavbar from '@/components/detail/detailNavbar'
import { ImagePreview, Toast } from 'vant'
import Vue from 'vue'

Vue.use(Toast)

Vue.filter('dateFilter', (time) => {
  return moment(time * 1000).format('YYYY-MM-DD')
})

Vue.directive('scroll', {
  inserted (el, binging) {
    // console.log(el)
    el.style.backgroundColor = 'hsla(0,0%,100%,0)'
    el.style.color = 'transparent'

    window.onscroll = () => {
      // console.log('scroll')
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binging.value) {
        // console.log('显示')
        el.style.backgroundColor = '#fff'
        el.style.color = '#000'
      } else {
        // console.log('隐藏')
        el.style.backgroundColor = 'hsla(0,0%,100%,0)'
        el.style.color = 'transparent'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      hidden: true,
      height: 'auto'
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailNavbar
  },
  methods: {
    handlePreview (array, index) {
      // let arr = []
      // if (type === 'poster') arr = [this.filmInfo.poster]
      // else if (type === 'photo') arr = this.filmInfo.photos
      // else arr = this.filmInfo.actors.map(item => item.avatarAddress)

      ImagePreview({
        images: array,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  computed: {
    computedActor () {
      return this.filmInfo.actors.map(item => item.avatarAddress)
    }
  },
  mounted () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    // 当前匹配的路由
    // console.log('created',this.$route.params)

    // axios 利用id发请求到详情接口
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=950124`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      // console.log(res)
      this.filmInfo = res.data.data.film

      // 隐藏
      // Toast.clear()
    })
  }

}
</script>
<style lang="scss" scoped>
@import url('@/assets/iconfont/iconfont.css');
.film {
  background-color: #f4f4f4;
  .film-poster {
    width: 100%;
    height: 56vw;
    background-size: cover;
    background-position: center;
  }
  .film-detail {
    padding: 0.15rem;
    padding-top: 0.12rem;
    background: #fff;
    .grey-text {
      font-size: 13px;
      color: #797d82;
      margin-bottom: 0.04rem;
    }
    .col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .film-name {
        width: 2.56rem;
        .name {
          color: #191a1b;
          font-size: 18px;
          height: 0.24rem;
          line-height: 0.24rem;
          margin-right: 0.07rem;
        }
        .type {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6d3;
          height: 0.14rem;
          line-height: 0.14rem;
          padding: 0 0.02rem;
          border-radius: 2px;
          vertical-align: middle;
        }
      }
      .film-grade {
        width: calc(100% - 2.5rem);
        text-align: right;
        color: #ffb232;
        .grade {
          font-size: 18px;
          font-style: italic;
        }
        .grade-text {
          font-size: 10px;
        }
      }
    }
    .film-synopsis {
      margin-top: 12px;
    }
    .hidden {
      max-height: 0.36rem;
      min-height: 0.36rem;
      overflow: hidden;
      transition: all 0.5s ease;
    }
    .visiblity {
       max-height: 1.8rem;
       min-height: .36rem;
       overflow: visible;
      transition: all 0.5s ease;
    }
    .toggle {
      text-align: center;
      height: auto;
      width: 20px;
      margin: auto;
      i {
        font-size: 8px;
        margin: auto;
        cursor: pointer;
      }
    }
    .upper {
      transform: rotate(180deg);
    }
  }
  .actors {
    margin-top: 10px;
    background-color: #fff;
    .actors-title {
      width: 3.45rem;
      padding: 15px;
      .actors-title-text {
        color: #191a1b;
      }
    }
    .actors-list {
      height: 1.4rem;
      background-color: #fff;
      padding-left: .15rem;
      overflow: hidden;

      .actors-img{
        width: .85rem;
        height: .85rem;
        background-size: cover;
        background-position: center;
      }
      .actors-name{
        text-align: center;
        padding-top:.1rem;
        font-size: 12px;
        color:#191a1b;
        width: .85rem;
        height: .18rem;

      }
      .actors-role{
        text-align: center;
        font-size: 10px;
        color: #797d82;

      }
      .ellipsis{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        }
    }
  }
  .photos{
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
    .photos-title{
      width: 3.45rem;
      height: 32px;
      padding: 15px;
      span{
        height: 22.5px;
        line-height: 22px;
      }
      .photo-title-text{
        font-size: 16px;
        color: #191a1b;
      }
      .photos-to-all{
        font-size: 13px;
        color: #797d82;
        float: right;
        i{
          font-size: 13px;
          font-family: iconfont !important;
        }
      }
    }
    .photos-list{
      height: 1.15rem;
      background: #fff;
      padding-left: .15rem;

        .photos-img{
          width: 1.6rem;
          height: 1rem;
         background-size: cover;
         background-position: center;
        }

    }
  }
  .goSchedule{
    width: 3.75rem;
    height: 50px;
    position: fixed;
    bottom: 0;
    left:0;
    text-align: center;
        background-color: #ff5f16;
        color: #fff;
        line-height: 50px;
        z-index: 200;
        cursor: pointer;

  }
}

</style>
