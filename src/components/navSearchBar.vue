<template>
  <van-nav-bar class="vantNav" fixed placeholder @click-left="onClickLeft" @click-right="onClickRight">
    <template #left>
      <van-icon color="#ffffff" name="arrow-left" size="18"/>
    </template>
    <template #title>
      <van-search v-model="searchKey" @search="onSearch" shape="round" clearable :placeholder="placeholder" />
    </template>
    <!-- <template #right>
      <van-icon color="#ffffff" name="cross" size="18" />
    </template> -->
  </van-nav-bar>
</template>

<script>
  export default {
    name:'navSearchBar',
    props: {
      placeholder: {
        type: String,
        default: '请输入搜索关键词'
      },
      // 是否开启实时搜索
      openRealTime:{
        type:Boolean,
        default: false
      },
      // pop中的navBar
      popBar:{
        type:Boolean,
        default: false
      }
    },
    watch: {
      searchKey (newVal, oldVal) {
        if(!this.openRealTime){
          return
        }
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.onSearch()
        }, 500)
      }
    },
    data() {
      return {
        searchKey: '',
        timer:undefined,
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
      onSearch(){
        this.$emit('search',this.searchKey)
      },
      clearSearchKey(){
        this.searchKey=''
      }
    },
  }
</script>

<style lang="scss" scoped>
.vantNav{
  &/deep/.van-nav-bar{
    background: $nav-background-color;
    .van-nav-bar__title{
      color: #ffffff;
      max-width: 90%;
      width: 270px;
    }
  }
  &/deep/.van-search {
    width: 100%;
    padding: 0;
    margin: 0;
    background: none;
  }
}

</style>