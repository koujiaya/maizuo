<template>
    <div class="header">
        <i class="iconfont icon-back" @click="handleBack"></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
   .header{
       position: fixed;
       top: 0;
       left: 0;
       width: 3.75rem;
       height: 45px;
       line-height: 45px;
        text-align: center;
       background: #fff;
       color: transparent;
       i{
           font-size: 30px;
           position: fixed;
           left:7.5px;
           top:7.5px;
           height: 30px;
          line-height: 30px;
           background-color: hsla(0,0%,100%,0.3);
           color:#000;
           display: block;
           border-radius: 15px;

       }
   }
</style>
