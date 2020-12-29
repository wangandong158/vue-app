<template>
  <div id="app">
    <keep-alive :include="catchPages">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['catchPages'])
  },
  created () {
    ic.run({
      action:"webview.hideWebViewToolbar",
    })
    ic.run({
      action:"system.getUserInfo",
      success:(data)=>{
        this.$store.dispatch('setUserName', data.userName)
        this.$store.dispatch('setUserAccount', data.account)
        this.$store.dispatch('setUserCode', data.userId)
      },
      fail:(error)=>{
        this.$dialogUtils.showDialog('信息获取失败').then(action=>{
          ic.run({
            action:"webview.close",
          })
        })
      }
    })
  },
}
</script>
<style lang="scss"></style>
