<template>
  <div class="f-input">
    <input
      type="text"
      class="f-input-inner"
      :value="modelValue"
      @input="handleInput"
    >
  </div>
</template>

<script>
export default {
  name: 'f-input',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    function handleInput (e) {
      emit('update:modelValue', e.target.value)
    }

    return {
      handleInput
    }
  }
}
</script>

<style lang='scss' scoped>
.f-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  &-inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    width: 100%;
    &:focus {
      outline: none;
      border-color: #2196f3;
      box-shadow: 0 0 0 2px #b1d9fa;
    }
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
</style>