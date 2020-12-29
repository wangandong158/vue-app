<template>
  <van-field :value="value" :formatter="formatter"  @input="onInput" :disabled='disabled' :readonly='readonly'></van-field>
</template>

<script>
  export default {
    name: 'numInput',
    props: {
      value: {
　　　　　default: '',
　　　　},
      disabled: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onInput(value) {
        this.$emit('input', value)
      },
      formatter(value) {
        return value.replace(/[^\-0-9.]/g,'');
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>