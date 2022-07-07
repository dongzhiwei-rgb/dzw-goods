<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="tar" style="position: relative; height: 426px">
      <transition name="fade">
        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </router-link>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </transition>
    </div>
  </HomePanel>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomePanel from "./home-panel.vue";
import HomeSkeleton from "./home-skeleton.vue";
import { HomeApi } from "@/utils/request";
import { LazyData } from "@/utils/hooks";
import {Throttled} from '@/utils/frequency/index'
@Component({
  components: {
    HomePanel,
    HomeSkeleton,
  },
})
export default class HomeHot extends Vue {
  goods: Array<any> = [];


  async scollTop() {
    if (this.goods.length == 0) {
      const res = await LazyData(this.$refs.tar, HomeApi.findHot);
      if (res) {
        this.goods = res;
        window.removeEventListener("scroll", this.scollTop)
      }
    }
  }

  mounted() {
      // TODO为滚动条添加节流
    window.addEventListener("scroll", Throttled(this.scollTop,500));
  }
}

</script>



<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>