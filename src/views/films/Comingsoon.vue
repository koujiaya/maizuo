<template>
  <div>
    <film-list :type="type"></film-list>
  </div>
</template>
<script>
import filmList from '@/components/films/filmList'
export default {
  components: {
    filmList
  },
  data () {
    return {
      type: 2
    }
  }
}
</script>
