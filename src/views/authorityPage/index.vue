<template>
  <div class="authorityPage">
    <div>
      <div class="home-back">
        <span class="iconfont icon-fanhui-copy-copy" @click="back"></span>
      </div>
      <div class="err_page" v-if="noAuthorityShow">
        <img src="../../assets/image/404.png" alt="">
        <div class="text">{{msg}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'authorityPage',
    data() {
      return {
        msg: '非法登录，请联系管理人员',
        noAuthorityShow: true
      }
    },
    mounted() {
      setTimeout(() => {
        this.back()
      }, 3000)
    },
    beforeUpdate() {
      this.hideToobarl()
      this.setStatus()
    },
    methods: {
      back() {
        try {
          ic.run({
            action: "webview.close",
          })
        } catch (error) {}
      },
      hideToobarl() {
        try {
          ic.run({
            action: 'webview.hideWebViewToolbar'
          })
        } catch (error) {}
      },
      setStatus(){
        ic.run({
          action:"webview.statusBarColor",
          params:{
              color:"#ffffff",
              ios:"UIStatusBarStyleLightConten", 
          },
        })
      }
    }
  }

</script>

<style lang="scss" scope>
  .authorityPage {
    background-color: #ffffff;
    height: 100vh;
    .home-back {
      display: flex;
      justify-content: space-between;
      font-size: 17px;
      color: #333333;
      padding: 15px 15px 0 15px;
    }
    .err_page {
      width: 100%;
      margin-top: 129.5px;
      img {
        width: 100%;
      }
      .text {
        text-align: center;
        font-size: 15px;
        color: #999999;
      }
    }
  }

</style>
