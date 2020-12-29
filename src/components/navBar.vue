<template>
  <van-nav-bar class="vantNav" fixed placeholder :title="title" @click-left="onClickLeft" @click-right="onClickRight">
    <template #left>
      <van-icon color="#ffffff" name="arrow-left" size="18"/>
    </template>
    <template #right>
      <van-icon color="#ffffff" name="cross" size="18" />
    </template>
  </van-nav-bar>
</template>

<script>
  export default {
    name:'navBar',
    props: {
      title: {
        type: String,
        default: ''
      },
      // pop中的navBar
      popBar:{
        type:Boolean,
        default: false
      }
    },
    methods: {
      onClickLeft() {
        if(this.popBar){
          this.$emit('onClickLeft')
        }else{
          this.$router.go(-1)
        }
      },
      onClickRight() {
        ic.run({
          action:"webview.close",
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.vantNav{
  &/deep/.van-nav-bar{
    background: $nav-background-color;
    .van-nav-bar__title{
      color: #ffffff;
    }
  }
}

</style>