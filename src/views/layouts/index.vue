<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive :include="catchPages">
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="layout-footer">
      <tab-bar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          active:require("../../assets/image/tab01.png"),
          inactive:require("../../assets/image/tab02.png"),
        },
        {
          title: '关于我',
          to: {
            name: 'About'
          },
          active:require("../../assets/image/tab03.png"),
          inactive:require("../../assets/image/tab04.png"),
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['catchPages'])
  },
  methods: {
    handleChange(v) {
      // console.log('tab value:', v)
    }
  }
}
</script>
