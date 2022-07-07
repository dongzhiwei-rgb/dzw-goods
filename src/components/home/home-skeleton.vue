<!-- 面板的骨架加载效果 -->
<template>
  <div class='home-skeleton'>
    <div class="item" v-for="i in 4" :key="i" :style="{backgroundColor:bg}">
      <LlSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <LlSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <LlSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>


<script lang="ts">
import { Component ,Vue,Prop} from 'vue-property-decorator'

@Component
export default class HomeSkeleton extends Vue{
    @Prop({type:String,default:'#fff'})bg!:string
}
</script>


<style scoped lang='less'>
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .ll-skeleton ~ .ll-skeleton{
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>