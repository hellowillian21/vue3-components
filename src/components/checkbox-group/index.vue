<template>
  <div class="f-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>

import { provide, getCurrentInstance } from 'vue'

export default {
  name: 'f-checkbox-group',
  props: {
    modelValue: {
      type: Array
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const checkboxGroup = getCurrentInstance()
    provide('checkboxGroup', checkboxGroup)

    return {
    }
  }
}
</script>

<style lang='scss' scoped>
.f-checkbox-group {
  display: inline-block;
}
</style>