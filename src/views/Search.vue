<template>
  <div>
    <van-search
      v-model="value"
      :show-action="true"
      placeholder="请输入搜索关键词"
      @cancel="onCancel"
      ref="search"
      class="sticky"
    />
    <cinema-list
    :cinemalist="computedList"
    :height="height"
    ></cinema-list>
  </div>
</template>
<script>
import cinemaList from '@/components/cinemas/cinemaList.vue'
import Vue from 'vue'
import { Search } from 'vant'
import obj from '@/utils/mixinObj'
Vue.use(Search)
export default {
  components: {
    cinemaList
  },
  mixins: [obj],
  data () {
    return {
      value: '',
      height: '0px'
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      )
    }
  },
  mounted () {
    this.height =
      document.documentElement.clientHeight -
     this.$refs.search.offsetHeight -
      document.querySelector('footer').offsetHeight +
      'px'
  }
}
</script>
<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
