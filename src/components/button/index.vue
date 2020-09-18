<template>
  <button
    class="f-button"
    :class="[
      `f-button-${type}`,
      `f-button-${size}`
    ]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'f-button',
  props: {
    type: {
      type: String,
      default: 'default-type'
    },
    size: {
      type: String,
      default: 'default-size'
    }
  },
  emits: [
    'click'
  ],
  setup (props, {emit}) {
    function handleClick (e) {
      emit('click', e)
    }
    
    return {
      handleClick
    }
  }
}
</script>

<style lang='scss' scoped>
.f-button {
  background-color: #ffffff;
  border: none;
  outline: none;
  &-default-type {
    border: 1px solid #dcdcdc;
    background-color: #ffffff;
    color: #333333;
    &:hover {
      color: #2196f3;
      border: 1px solid #2196f3;
      background-color: #e1f5fe;
    }
    &:active {
      color: #1976d2;
      border: 1px solid #1976d2;
      background-color: #e1f5fe;
    }
  }
  &-primary {
    border: 1px solid #2196f3;
    background-color: #2196f3;
    color: #ffffff;
    &:hover {
      border: 1px solid #42a5f5;
      background-color: #42a5f5;
      color: #ffffff;
    }
    &:active {
      border: 1px solid #1e88e5;
      background-color: #1e88e5;
      color: #ffffff;
    }
  }
  &-success {
    border: 1px solid #4caf50;
    background-color: #4caf50;
    color: #ffffff;
    &:hover {
      border: 1px solid #66bb6a;
      background-color: #66bb6a;
      color: #ffffff;
    }
    &:active {
      border: 1px solid #43a047;
      background-color: #43a047;
      color: #ffffff;
    }
  }
  &-info {
    border: 1px solid #9e9e9e;
    background-color: #9e9e9e;
    color: #ffffff;
    &:hover {
      border: 1px solid #bdbdbd;
      background-color: #bdbdbd;
      color: #ffffff;
    }
    &:active {
      border: 1px solid #757575;
      background-color: #757575;
      color: #ffffff;
    }
  }
  &-warning {
    border: 1px solid #ff9800;
    background-color: #ff9800;
    color: #ffffff;
    &:hover {
      border: 1px solid #ffa726;
      background-color: #ffa726;
      color: #ffffff;
    }
    &:active {
      border: 1px solid #fb8c00;
      background-color: #fb8c00;
      color: #ffffff;
    }
  }
  &-danger {
    border: 1px solid #f44336;
    background-color: #f44336;
    color: #ffffff;
    &:hover {
      border: 1px solid #ef5350;
      background-color: #ef5350;
      color: #ffffff;
    }
    &:active {
      border: 1px solid #e53935;
      background-color: #e53935;
      color: #ffffff;
    }
  }
  &-default-size {
    font-size: 14px;
    padding: 10px 16px;
  }
  &-small {
    font-size: 14px;
    padding: 6px 12px;
  }
  &-mini {
    font-size: 12px;
    padding: 4px 8px;
  }
}
</style>