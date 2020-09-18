<template>
  <div
    class="f-message"
    :style="positionStyle"
  >
    <div
      class="f-message-inner"
      :class="[`f-message-inner-${type}`]"
    >
      <svg
        v-if="type === 'primary'"
        viewBox="0 0 16 16"
        class="bi bi-volume-down"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8.717 3.55A.5.5 0 0 1 9 4v8a.5.5 0 0 1-.812.39L5.825 10.5H3.5A.5.5 0 0 1 3 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM8 5.04L6.312 6.39A.5.5 0 0 1 6 6.5H4v3h2a.5.5 0 0 1 .312.11L8 10.96V5.04z"
        />
        <path d="M10.707 11.182A4.486 4.486 0 0 0 12.025 8a4.486 4.486 0 0 0-1.318-3.182L10 5.525A3.489 3.489 0 0 1 11.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z" />
      </svg>
      <svg
        v-if="type === 'success'"
        viewBox="0 0 16 16"
        class="bi bi-check2-circle"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
        />
        <path
          fill-rule="evenodd"
          d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"
        />
      </svg>
      <svg
        v-if="type === 'danger'"
        viewBox="0 0 16 16"
        class="bi bi-x-circle"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          fill-rule="evenodd"
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="type === 'warning'"
        viewBox="0 0 16 16"
        class="bi bi-triangle-half"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8.065 2.016a.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.162.162 0 0 1-.054.06.115.115 0 0 1-.066.017l-6.856-.017V2a.13.13 0 0 1 .063.016zm-1.043-.45a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
        />
      </svg>
      <svg
        v-if="type === 'info'"
        viewBox="0 0 16 16"
        class="bi bi-info-circle"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
        <circle
          cx="8"
          cy="4.5"
          r="1"
        />
      </svg>
      <div>{{message}}</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'f-message-wrapper',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    message: {
      type: String,
      default: ''
    },
    verticalOffset: {
      type: Number
    }
  },
  setup (props) {
    console.log(props)
    const positionStyle = computed(() => {
      return {
        'top': `${props.verticalOffset}px`
      }
    })
    return {
      positionStyle
    }
  }
}
</script>

<style lang='scss' scoped>
.f-message {
  width: 20%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  display: flex;
  justify-content: center;
  z-index: 1000;
  user-select: none;
  animation: messageIn 0.3s;
  @keyframes messageIn {
    from {
      margin-top: -16px;
    }
    to {
      margin-top: 0;
    }
  }

  .f-message-inner {
    width: 100%;
    color: #ffffff;
    border-radius: 4px;
    padding: 16px 16px;
    display: flex;
    align-items: center;
    .bi {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
    &-primary {
      color: #2196f3;
      background-color: #bbdefb;
      border: 1px solid #90caf9;
    }
    &-success {
      color: #4caf50;
      background-color: #c8e6c9;
      border: 1px solid #a5d6a7;
    }
    &-danger {
      color: #f44336;
      background-color: #ffcdd2;
      border: 1px solid #ef9a9a;
    }
    &-warning {
      color: #ff9800;
      background-color: #ffe0b2;
      border: 1px solid #ffcc80;
    }
    &-info {
      color: #9e9e9e;
      background-color: #f5f5f5;
      border: 1px solid #eeeeee;
    }
  }
}

.f-message-out {
  animation: messageOut 0.3s;
  @keyframes messageOut {
    from {
      margin-top: 0;
    }
    to {
      margin-top: -60px;
    }
  }
}
</style>