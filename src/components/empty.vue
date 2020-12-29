<template>
  <van-empty :image="image" :description="text" />
</template>

<script>
  export default {
    name:'empty',
    props: {
      image: {
        type: String,
        default: require('@/assets/image/empty.png')
      },
      text:{
        type: String,
        default: '空空如也'
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>