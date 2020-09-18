<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      class="f-dialog"
      ref="dialogRef"
      v-show="visible"
      @click.self="handleDialogClose"
    >
      <div
        class="f-dialog-main"
        :style="{width: width, marginTop: top}"
      >
        <div class="f-dialog-main-header">
          <div class="title">{{title}}</div>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-x"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            @click="handleDialogClose"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <div class="f-dialog-main-content">
          <slot></slot>
        </div>
        <div class="f-dialog-main-footer">
          <f-button
            size='small'
            @click="handleCancelClick"
          >取消</f-button>
          <f-button
            size='small'
            type="primary"
            @click="handleConfrimClick"
          >确定</f-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import FButton from '../button/index.vue'

// props: visible\title\width\top
// event: confrim\cancel\closed\opened
export default {
  name: 'f-dialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '30%'
    },
    top: {
      type: String,
      default: '15vh'
    }
  },
  components: {
    FButton
  },
  emits: [
    'update:visible',
    'confrim',
    'cancel',
    'closed',
    'opened'
  ],
  setup (props, {emit}) {
    const dialogRef = ref(null)

    onMounted(() => {
      document.body.appendChild(dialogRef.value)
    })

    // 关闭
    function handleDialogClose () {
      emit('update:visible', false)
    }

    // 点击取消按钮
    function handleCancelClick () {
      emit('confrim')
    }

    // 点击确认按钮
    function handleConfrimClick () {
      emit('cancel')
    }
    
    // 打开了
    function afterEnter () {
      emit('opened')
    }

    // 关闭了
    function afterLeave () {
      emit('closed')
    }

    return {
      dialogRef,
      handleDialogClose,
      handleCancelClick,
      handleConfrimClick,
      afterEnter,
      afterLeave
    }
  }
}
</script>

<style lang='scss' scoped>
.f-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.3);
  &-main {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    width: 30%;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 0 36px 0px rgba(0, 0, 0, 0.1);
    &-header {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px;
      .bi-x {
        width: 24px;
        height: 24px;
        color: #999999;
        &:hover {
          background-color: #e8e8e8;
        }
        &:active {
          background-color: #eeeeee;
        }
      }
    }
    &-content {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 16px;
    }
    &-footer {
      text-align: right;
      padding: 16px;
      .f-button {
        margin-left: 16px;
      }
    }
  }
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.5s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>