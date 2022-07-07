<template>
  <div class="app-header-sticky" :class="{show: y >=78}">
    <div class="container" v-show="y>=78">
      <router-link class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppHeaderNav from "@/components/app-header-nav.vue";

@Component({
  components: {
    AppHeaderNav,
  },
})
export default class AppHeaderSticky extends Vue {
    y = 0;


    mounted(){
        window.addEventListener('scroll',this.sety)
    }
    sety(){
        this.y = document.documentElement.scrollTop
    }

}
</script>


<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @llColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @llColor;
      }
    }
  }
}
</style>