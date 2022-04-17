<template>
    <div class="recommend-city">
        <div class="hot-city">
            <div class="city-title">热门城市</div>
            <ul class="city-list">
                <li class="city-item" v-for="city in hotcitylist" :key="city.cityId">
                  <div class="city-item-text" @click="handleClick(city)">  {{city.name}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    hotcitylist: {
      type: Array
    }
  },
  methods: {
    handleClick (city) {
      this.$emit('event', city)
    }
  }
}
</script>
<style lang="scss" scoped>
.recommend-city{
    background-color: #fff;
    padding-left: 15px;
    padding-top: 15px;
    .hot-city{
        .city-title{
            font-size: 13px;
            color: #797d82;
            margin-bottom: 10px;
        }
        .city-list{
            display: flex;
            justify-content: flex-start;
            align-content: center;
            flex-wrap: wrap;
            .city-item{
                width: calc(33.33333vw - 11px);
                text-align: center;
                padding-bottom: 15px;
                box-sizing: border-box;
                 float: left;
                 .city-item-text{
                     height: 30px;
                    background-color: #f4f4f4;
                    line-height: 30px;
                    border-radius: 3px;
                    box-sizing: border-box;
                    margin: 0 7.5px;
                    font-size: 14px;
                    color: #191a1b;
                 }
            }

        }
    }
  }
</style>
