<!-- 商品推荐组件 实现商品的同类推荐与猜你喜欢展示功能。-->
<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 此处使用改造后的ll-carousel.vue -->
    <LlCarousel :sliders="sliders" style="height:380px" auto-play />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { GoodsApi } from "@/utils/request";

@Component
export default class GoodsRelevant extends Vue {
  @Prop({ type: String }) goodsId!: any;

  sliders: Array<any> = [];

  Id = this.$props.goodsId;

  created() {
    GoodsApi.findRelGoods({ id: this.Id, limit: 16 }).then((result) => {
      // 每页4条
      const size = 4;
      const total = Math.ceil(result.length / size);
      for (let i = 0; i < total; i++) {
        // 获取0 1 2 3
        // 获取4 5 6 7 
        this.sliders.push(result.slice(i * size,(i+1)*size));
      }
    });
  }
}
</script>


<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @llColor;
      border-right: 4px solid @llColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@llColor, 40%);
      }
    }
  }
}

:deep(.ll-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @llColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}

</style>