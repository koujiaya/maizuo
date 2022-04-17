<template>
  <div class="swiper kou">
      <div class="swiper-wrapper">
          <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper/bundle'

export default {
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },

  mounted () {
    new Swiper('.kou', {
      // direction:'vertical',//垂直
      loop: this.loop,
      autoplay: this.autoplay,
      pagination: {
        el: '.swiper-pagination'
      }

    })
  }
}
</script>
<style lang="scss" scoped>
 @import url('../../../node_modules/swiper/swiper-bundle.css');
</style>
