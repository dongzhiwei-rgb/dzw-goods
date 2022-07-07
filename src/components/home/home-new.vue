<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><LlMore path="/" /></template>
      <!-- 面板内容 -->
      <div ref="tar" style="position: relative; height: 406px">
        <transition name="fade">
          <ul v-if="goods.length" ref="pannel" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </router-link>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </transition>
      </div>
    </HomePanel>
  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomePanel from './home-panel.vue';
import HomeSkeleton from './home-skeleton.vue';
import { HomeApi } from '@/utils/request';
import { LazyData } from '@/utils/hooks';
import {Throttled} from '@/utils/frequency/index'


@Component({
  components: {
    HomePanel,
    HomeSkeleton,
  },
})
export default class HomeNew extends Vue {
  goods: Array<any> = [];

  async scollTop() {
    if (this.goods.length == 0) {
      const res = await LazyData(this.$refs.tar, HomeApi.findNew);
      if (res) {
        this.goods = res;
        window.removeEventListener("scroll", this.scollTop)
      }
    }
  }

  mounted() {
    //scollTop 函数的参数
    // TODO为滚动条添加节流
    window.addEventListener("scroll", Throttled(this.scollTop,500));
  }
}
</script>


<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>