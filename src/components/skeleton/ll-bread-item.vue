<template>
  <div class="ll-bread-item">
    <router-link v-if="to" :to="to"><slot /></router-link>
    <span v-else><slot /></span>
    <i class="iconfont icon-angle-right"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class LlBreadItem extends Vue{
    @Prop({type:[String,Object],default:''})to!:any

}

</script>