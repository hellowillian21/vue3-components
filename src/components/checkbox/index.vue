<template>
  <label
    class="f-checkbox"
    :class="{'is-checked': isChecked}"
  >
    <span class="f-checkbox-input">
      <span class="f-checkbox-inner"></span>
      <input
        class="f-checkbox-original"
        type="checkbox"
        v-model="model"
        :value="label"
      >
    </span>
    <span class="f-checkbox-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  name: 'f-checkbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [Array, String, Boolean]
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const checkboxGroupVm = inject('checkboxGroup', '')
    const isGroup = computed(() => !!checkboxGroupVm)
    const model = computed({
      get: () => {
        return isGroup.value ? checkboxGroupVm.props.modelValue : props.modelValue
      },
      set: (val) => {
        isGroup.value ? checkboxGroupVm.emit('update:modelValue', val) : emit('update:modelValue', val)
      }
    })
    
    const isChecked = computed(() => {
      return isGroup.value ? model.value.includes(props.label) : model.value
    })

    return {
      isChecked,
      model
    }
  }
}
</script>

<style lang='scss' scoped>
.f-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 16px;
  &-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .f-checkbox-inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
    .f-checkbox-original {
      width: 0;
      height: 0;
      opacity: 0;
      outline: none;
      position: absolute;
      left: 10px;
      margin: 0;
      z-index: -1;
    }
  }
  .f-checkbox-label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
}

.f-checkbox.is-checked {
  .f-checkbox-input {
    .f-checkbox-inner {
      background-color: #2196f3;
      border-color: #2196f3;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }
  .f-checkbox-label {
    color: #2196f3;
  }
}
</style>