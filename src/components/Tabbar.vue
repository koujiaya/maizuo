<template>
   <footer>
        <ul>
          <!-- 声明式导航 -->
          <!-- <li>
              <a href="/#/films">电影</a>
            </li>
            <li>
              <a href="/#/cinemas">影院</a>
            </li>
             <li>
              <a href="/#/center">我的</a>
            </li> -->

          <!-- vue-router(3) -1- 声明式导航 -->

          <!-- <router-link to="/films" active-class="kou-active" tag='li'>电影</router-link>

            <router-link to="/cinemas" active-class="kou-active" tag='li'>影院</router-link>

            <router-link to="/center" active-class="kou-active" tag='li'>我的</router-link> -->

          <!-- vue-router(4) -2- 声明式导航 -->
          <!-- <router-link to="/films" custom v-slot='{navigate,isActive}'>
            <li @click='navigate' :class="isActive?'kou-active':''">电影</li>
           </router-link>
           <router-link to="/cinemas" custom v-slot='{navigate,isActive}'>
            <li @click='navigate' :class="isActive?'kou-active':''">影院</li>
           </router-link>
          <router-link to="/center" custom v-slot='{navigate,isActive}'>
            <li @click='navigate' :class="isActive?'kou-active':''">我的</li>
           </router-link> -->

          <router-link
            v-for="tab in tablist"
            :key="tab.id"
            :to="tab.path"
            custom
            v-slot="{ navigate, isActive }"
          >
            <li @click="navigate" :class="isActive ? 'kou-active' : ''">
                <i :class='tab.icon'></i>
             <span> {{ tab.name }}</span>
            </li>
          </router-link>
        </ul>
   </footer>
</template>
<script>
import '../assets/iconfont/iconfont.css'
export default {
  props: {
    tablist: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
    footer{
        position: fixed;
        bottom: 0;
        left:0;
        z-index: 100;
        width: 3.75rem;
        height: 50px;
        background-color: #fff;
        ul{
            display: flex;
            li{
                text-align: center;
                flex: 1;
                display: flex;
                flex-direction: column;
                i{
                    line-height: 30px;
                    font-size: 22px;
                }
                span{
                    line-height: 20px;
                    font-size: 10px;
                }
            }
            .kou-active {
                color: #ff5f16;
            }
        }
    }

</style>
