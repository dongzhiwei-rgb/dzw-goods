<!-- 根据二级类目ID展示多级面包屑 -->
<template>
  <LlBread>
    <LlBreadItem to="/">首页</LlBreadItem>
    <LlBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</LlBreadItem>
    <transition name="fade-right" mode="out-in">
      <LlBreadItem v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</LlBreadItem>
    </transition>
  </LlBread>
</template>


<script lang="ts">
import {Component ,Vue} from 'vue-property-decorator'

@Component
export default class SubBread extends Vue {
    

    get category (){
        let obj:any = {}
        this.$store.state.category.topCategory.forEach((top:any) =>{
            top.children && top.children.forEach((sub:any) =>{
                if(sub.id === this.$route.params.id){
                    //  设置二级类目
                    obj.sub = { id:sub.id,name:sub.name}
                    // 设置一级目类
                    obj.top = { id:top.id,name:top.name}
                }
            })
        })
        return obj
    }
}
</script>



<style scoped lang="less"></style>