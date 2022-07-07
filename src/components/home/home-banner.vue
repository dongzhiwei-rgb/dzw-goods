<template>
  <div class="home-banner">
    <LlCarousel  :sliders="sliders" />
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { HomeApi } from '@/utils/request';

@Component
export default class HomeBanner extends Vue{
    sliders:Array<any> = []
    


    created() {
    (async () => {
      const data = await HomeApi.findBanner();
      this.sliders = data;
    })();
  }
}

</script>


<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
// 覆盖样式
.ll-carousel {
  :deep(.carousel-btn.prev){
    left: 270px;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>