<template>
  <ul>
    <router-link
      v-for="tab in tablist"
      :key="tab.id"
      :to="tab.path"
      custom
      v-slot="{ navigate, isActive }"
    >
      <li @click="navigate" >
       <span :class="isActive ? 'kou-active' : ''"> {{ tab.name }}</span>
      </li>
    </router-link>
  </ul>
</template>
<script>
export default {
  props: {
    tablist: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
ul {
  width: 3.75rem;
  height: 50px;
  line-height: 50px;
  display: flex;
  background: #fff;
  li {
    flex: 1;
    text-align: center;
    .kou-active {
    padding-bottom:10px;
    color: #ff5f16;
    border-bottom: 2px solid #ff5f16;
  }
  }
}
</style>
