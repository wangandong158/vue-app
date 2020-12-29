<template>
  <div>
    <van-tabbar fixed route v-model="active" @change="handleChange" active-color="#3480FF" inactive-color="#999999">
      <van-tabbar-item v-for="(item, index) in data" :to="item.to"  :key="index">
          <span>{{ item.title }}</span>
          <template #icon="props">
            <img :src="props.active ? item.active : item.inactive" />
          </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'tabBar',
  props: {
    defaultActive: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      active: this.defaultActive
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/deep/ .van-tabbar-item{
  font-size: 10px;
}
</style>
