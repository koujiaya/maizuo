<template>
  <div class="box" :style="{ height: height }">
    <ul class="cinema-list">
      <li
        class="cinema-list-item"
        v-for="cinema in cinemalist"
        :key="cinema.cinemaId"
      >
        <div class="cinema-info-left">
          <span class="cinema-name ellipsis">{{ cinema.name }}</span>
          <span class="cinema-address ellipsis">{{ cinema.address }}</span>
        </div>
        <div class="cinema-info-right">
          <div class="cinema-price">
            <span class="rmb">￥</span>
            <span class="price">{{ cinema.lowPrice / 100 }}</span>
            <span class="upon">起</span>
          </div>
          <div class="cinema-gpsAddress">
            <span>距离未知</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
import { mapState, mapActions } from 'vuex' // export
export default {
  props: {
    cinemalist: {
      type: Array
    },
    height: {
      type: String
    }
  },
  methods: {
    ...mapActions(['getCinemaData'])
  },
  computed: {
    ...mapState(['cinemaList', 'cityId'])
  },

  mounted () {
    // console.log({ ...mapActions(['getCinemaData']) })

    // console.log(this.$store.state.cinemaList)
    // 分发
    if (this.cinemaList.length === 0) {
      this.getCinemaData(this.cityId)
        .then(res => {
          // console.log('数据完事了')
          this.$nextTick(() => {
            new BetterScroll('.box', {
              scrollbar: {
                fade: true
              }
            })
          })
        })
    } else {
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=7425667`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then((res) => {
    //   // console.log(res.data.data)
    //   this.cinemalist = res.data.data.cinemas
    //   // console.log(document.getElementsByTagName('li').length)
    //   // new BetterScroll('.box')
    //   this.$nextTick(() => {
    //     // console.log(document.getElementsByTagName('li').length)
    // new BetterScroll('.box', {
    //   scrollbar: {
    //     fade: true
    //   }
    // })
    //   })
    // })
  }
}
</script>
<style lang="scss" scoped>
.box {
  // height: 6rem;
  overflow: hidden;
  position: relative;
  // top:50px
  //修正滚动条位置
}
.cinema-list {
  width: 3.75rem;
  .cinema-list-item {
    width: 3.45rem;
    padding: 0.15rem;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    .cinema-info-left {
      float: left;
      text-align: left;
      width: calc(100% - 0.65rem);
      padding-right: 0.15rem;
      display: flex;
      flex-direction: column;
      span {
        display: block;
        max-width: 80%;
      }
      .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cinema-name {
        float: left;
        color: #191a1b;
        font-size: 15px;
      }
      .cinema-address {
        margin-top: 0.05rem;
        font-size: 12px;
        color: #797d82;
      }
    }
    .cinema-info-right {
      float: right;
      text-align: center;
      margin-right: -0.05rem;
      width: 0.7rem;
      .cinema-price {
        span {
          color: #ff5f16;
        }
        .rmb {
          font-size: 11px;
        }
        .price {
          font-size: 15px;
        }
        .upon {
          font-size: 10px;
        }
      }
      .cinema-gpsAddress {
        display: block;
        font-size: 11px;
        color: #797d82;
        margin-top: 0.05rem;
      }
    }
  }
}
</style>
