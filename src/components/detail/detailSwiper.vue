<template>
  <ul class="swiper" :class="name">
      <li class="swiper-wrapper">
          <slot></slot>
      </li>
  </ul>
</template>
<script>
import Swiper from 'swiper/bundle'

export default {
  props: {
    slidesPerView: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'kou'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 15,
      freeMode: true
    })
  }
}
</script>
<style lang="scss" scoped>
 @import url('../../../node_modules/swiper/swiper-bundle.css');
</style>
