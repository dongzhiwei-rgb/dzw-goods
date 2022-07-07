<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot/>
    <!-- 热门品牌 -->
    <HomeBrand />
    <!-- 商品组件 -->
    <HomeProduct/>
    <!-- 最新专题 -->
    <HomeSpecial />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeCategory from '@/components/home/home-category.vue'
import HomeBanner from "@/components/home/home-banner.vue";
import HomeNew from "@/components/home/home-new.vue";
import HomeHot from "@/components/home/home-hot.vue";
import HomeBrand from "@/components/home/home-brand.vue";
import HomeProduct from '@/components/home/home-product.vue'
import HomeSpecial from "@/components/home/home-special.vue";

@Component({
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  },
})
export default class HomeIndex extends Vue {}
</script>
