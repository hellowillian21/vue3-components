<template>
  <div
    class="f-input-car-plate"
    v-clickoutside="handleInputCarPlateClickOutside"
  >
    <!-- 新能源选项  -->
    <div class="new-energy">
      <f-checkbox v-model="isNewEnergy">新能源</f-checkbox>
    </div>
    <!-- 输入框 -->
    <div class="f-input-car-plate-inner">
      <div
        class="word-input-item"
        v-for="(plateWord, index) in plateWords"
        :key="index"
      >
        <button
          class="word-input-btn"
          :class="{'word-input-btn-active': currentIndex === index}"
          @click.prevent="handleWordInputClick(index)"
        >{{plateWord}}</button>
        <div
          v-if="index<plateWords.length-1"
          class="line"
        ></div>
      </div>
    </div>
    <!-- 键盘 -->
    <div
      class="f-input-car-plate-keyboard"
      v-show="showKeyboard"
    >
      <div
        class="row"
        v-show="currentIndex === 0"
      >
        <button
          class="f-input-car-plate-keyboard-key"
          v-for="(key,index) in keyboardDate.data1"
          :key="index"
          @click="handleSelectKeyWord(key)"
        >{{key}}</button>
      </div>
      <div
        class="row"
        v-show="currentIndex !== 0 && currentIndex !== 1"
      >
        <button
          class="f-input-car-plate-keyboard-key"
          v-for="(key,index) in '1234567890'"
          :key="index"
          @click="handleSelectKeyWord(key)"
        >{{key}}</button>
      </div>
      <div
        class="row"
        v-show="currentIndex !== 0"
      >
        <button
          class="f-input-car-plate-keyboard-key"
          v-for="(key,index) in keyboardDate.data2"
          :key="index"
          :disabled="currentIndex !== 1 && key === 'O'"
          @click="handleSelectKeyWord(key)"
        >{{key}}</button>
      </div>
      <div
        class="row"
        v-show="currentIndex === plateWords.length - 1"
      >
        <button
          class="f-input-car-plate-keyboard-key"
          v-for="(key,index) in keyboardDate.data3"
          :key="index"
          @click="handleSelectKeyWord(key)"
        >{{key}}</button>
      </div>
      <div class="function-row">
        <button
          class="f-input-car-plate-keyboard-operation"
          @click="handleEmptyClick"
        >
          <svg
            viewBox="0 0 16 16"
            class="bi bi-x-square"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              fill-rule="evenodd"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
          <div>清空</div>
        </button>
        <button
          class="f-input-car-plate-keyboard-operation"
          @click="handleDeleteClick"
        >
          <svg
            viewBox="0 0 16 16"
            class="bi bi-backspace"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6.603 2h7.08a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7.08a1 1 0 0 1-.76-.35L1 8l4.844-5.65A1 1 0 0 1 6.603 2zm7.08-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zM5.829 5.146a.5.5 0 0 0 0 .708L7.976 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"
            />
          </svg>
          <div>删除</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, computed } from 'vue'
import FCheckbox from '../checkbox/index.vue'

// 点击外部的自定义指令
const clickoutside = {
  beforeMount (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.value) {
        // 如果绑定了函数 则调用那个函数
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unmounted (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}

export default {
  name: 'f-input-car-plate',
  directives: { clickoutside },
  components: {
    FCheckbox
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup (props, {emit}) {
    let isNewEnergy = ref(false) // 是否是新能源
    let currentIndex = ref(null) // 当前输入框位置
    const keyboardDate = reactive({
      data1: '粤京沪津浙苏湘赣鄂豫皖陕甘宁云贵川渝黑吉辽晋冀鲁闽琼桂蒙青藏新使无',
      data2: 'ABCDEFGHJKLMNOPQRSTUVWXYZ',
      data3: '港澳学领'
    })

    const plateWords = computed({
      get: () => {
        let _plateWords
        if (isNewEnergy.value) {
          _plateWords = new Array(8).fill('')
        } else {
          _plateWords = new Array(7).fill('')
        }

        const modelValueArr = props.modelValue.split('')
        _plateWords.forEach((item, index) => {
          _plateWords[index] = modelValueArr[index]
            ? modelValueArr[index]
            : ''
        })
        return _plateWords
      },
      set: (val) => {
        console.log('set')
        emit('update:modelValue', val.join(''))
      }
    })

    
    // 监听新能源选项切换
    watch(isNewEnergy, (isNewEnergy) => {
      // plateWords在computed的get因为isNewEnergy变化过
      if (isNewEnergy) {
        plateWords.value = [...plateWords.value] 
      } else {
        const newPlateWords = [...plateWords.value]
        plateWords.value = newPlateWords
      }
    })

    // 是否显示键盘
    const showKeyboard = computed(() => {
      return currentIndex.value !== null && -1 < currentIndex.value &&currentIndex.value < plateWords.value.length
    })

    // 点击输入框
    function handleWordInputClick (index) {
      currentIndex.value = index
    }

    // 选中键盘值
    function handleSelectKeyWord (key) {
      if (currentIndex.value > plateWords.value.length - 1) {
        return
      }
      const newPlateWords = [...plateWords.value]
      newPlateWords[currentIndex.value] = key
      plateWords.value = newPlateWords
      currentIndex.value = currentIndex.value + 1
    }

    // 点击车牌组件外部
    function handleInputCarPlateClickOutside () {
      // 让光标位置不在车牌中
      currentIndex.value = -1
    }

    // 清空
    function handleEmptyClick () {
      if (isNewEnergy.value) {
        plateWords.value = new Array(8).fill('')
        // 让光标位置不在车牌中
        currentIndex.value = -1
      } else {
        plateWords.value = new Array(7).fill('')
        // 让光标位置不在车牌中
        currentIndex.value = -1
      }
    }

    // 删除
    function handleDeleteClick () {
      const newPlateWords = [...plateWords.value]
      newPlateWords[currentIndex.value] = ''
      plateWords.value = newPlateWords
      currentIndex.value = currentIndex.value - 1 < 0 
        ? 0
        : currentIndex.value - 1 
    }

    return {
      isNewEnergy,
      keyboardDate,
      plateWords,
      handleWordInputClick,
      currentIndex,
      handleSelectKeyWord,
      handleInputCarPlateClickOutside,
      showKeyboard,
      handleEmptyClick,
      handleDeleteClick
    }
  }
}
</script>

<style lang='scss' scoped>
.f-input-car-plate {
  font-size: 14px;
  position: relative;
  display: inline-block;
  .new-energy {
    text-align: right;
    .f-checkbox {
      margin: 0;
    }
  }
  .f-input-car-plate-inner {
    border: 1px solid #cccccc;
    display: flex;
    border-radius: 4px;
    .word-input-item {
      display: flex;
      align-items: center;
      .word-input-btn {
        box-sizing: border-box;
        width: 24px;
        height: 30px;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        border: none;
        outline: none;
        border-radius: 4px;
        color: #444444;
        text-align: center;
        font-weight: bold;
        &:first-child {
          width: 26px;
        }
        &:last-child {
          width: 26px;
        }
        &-active {
          border: 1px solid #ffcc80;
        }
      }
      .line {
        width: 1px;
        height: 20px;
        background-color: #cccccc;
      }
    }
  }
  .f-input-car-plate-keyboard {
    position: absolute;
    top: 54px;
    left: 0;
    width: 330px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 #dddddd;
    padding: 16px;
    &-key {
      color: #444444;
      font-size: 16px;
      margin-bottom: 8px;
      margin-right: 8px;
      width: 40px;
      height: 30px;
      padding: 0;
      background-color: #eeeeee;
      border: none;
      box-shadow: 0 0 4px 0 #cccccc;
      outline: none;
      border-radius: 4px;
      user-select: none;
      &:nth-child(7n) {
        margin-right: 0;
      }
      &:active {
        background-color: #dddddd;
      }
      &:disabled {
        cursor: not-allowed;
        background-color: #fafafa;
      }
    }
    // 功能栏
    .function-row {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }
    &-operation {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #444444;
      font-size: 16px;
      padding: 4px 8px;
      background-color: #eeeeee;
      border: none;
      box-shadow: 0 0 4px 0 #cccccc;
      outline: none;
      border-radius: 4px;
      user-select: none;
      margin-left: 10px;
      &:active {
        background-color: #dddddd;
      }
      .bi-x-square {
        width: 16px;
        height: 16px;
        margin-right: 4px;
        color: #444444;
      }
      .bi-backspace {
        width: 16px;
        height: 16px;
        margin-right: 4px;
        color: #444444;
      }
    }
  }
}
</style>