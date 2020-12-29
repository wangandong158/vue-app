<!-- home -->
<template>
  <div class="about-container">
  </div>
</template>

<script>
// 请求接口
import { getUserInfo } from '@/api/user.js'
import { mapGetters } from 'vuex'
export default {
  name:'About',
  data() {
    return {
    }
  },
  created () {
    console.log("about");
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 请求数据案例
    initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      const params = { user: 'sunnie' }
      getUserInfo(params)
        .then(() => { })
        .catch(() => { })
    }
  }
}
</script>
<style lang="scss" scoped>
.about-container {
  background: #fff;
}
</style>
