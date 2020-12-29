<template>
  <van-tag class="tag-item" round :class="select?'tag-select':'tag-normal'" :plain='!select' size="large">{{showText}}</van-tag>
</template>

<script>
  export default {
    name: 'wadTag',
    props: {
      select: {
        type: Boolean,
        default: false
      },
      showText: {
        type: String,
        default: ''
      }
    },
  }
</script>

<style lang="scss" scoped>
.tag-item{
  margin-right: 8px;
  margin-bottom: 16px;
  color: #999999;
  font-size: 12px;
  line-height:22px ;
  height: 22px;
  // border-radius:12px;
  padding: 0 8px;
  // font-weight: 400;
  // border: none;
  // &::before{
  //   border-color:#999999;
  // }
  // &::after{
  //   border-color:#999999;
  // }
}
.tag-select{
  color: #3480FF;
  background:#EAF2FF;
  // font-weight: 600;
  // &::before{
  //   border:none;
  // }
  // &::after{
  //   border:none;
  // }
}
// .tag-normal{
// }
</style>