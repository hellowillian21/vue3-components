<template>
  <div>
    <!-- 按钮 -->
    <div class="item">
      <div class="title">按钮 Button</div>
      <f-button>默认按钮</f-button>
      <f-button type="primary">主要按钮</f-button>
      <f-button type="success">成功按钮</f-button>
      <f-button type="info">信息按钮</f-button>
      <f-button type="warning">警告按钮</f-button>
      <f-button type="danger">危险按钮</f-button>
      <f-button
        type="success"
        size="small"
      >small大小</f-button>
      <f-button
        type="success"
        size="mini"
      >mini大小</f-button>
    </div>
    <!-- 对话框 -->
    <div class="item">
      <div class="title">对话框 Dialog</div>
      <f-button
        type="primary"
        @click="handleShowDialog"
      >显示对话框</f-button>
      <f-dialog v-model:visible="dialogVisible">
        <div>来自对话框的提示</div>
      </f-dialog>
    </div>
    <!-- 消息提示 -->
    <div class="item">
      <div class="title">消息提示 Message</div>
      <f-button
        type="primary"
        @click="handleShowMessage('primary', '我是primary')"
      >提示primary</f-button>
      <f-button
        type="primary"
        @click="handleShowMessage('success', '我是success')"
      >提示success</f-button>
      <f-button
        type="primary"
        @click="handleShowMessage('danger', '我是danger')"
      >提示danger</f-button>
      <f-button
        type="primary"
        @click="handleShowMessage('warning', '我是warning')"
      >提示warning</f-button>
      <f-button
        type="primary"
        @click="handleShowMessage('info', '我是info')"
      >提示info</f-button>
    </div>
    <!-- 复选框 -->
    <div class="item">
      <div class="title">多选框 Checkbox</div>
      <div>
        <f-checkbox
          v-model="checkbox"
          label="只有一个选项的checkbox"
        ></f-checkbox>
      </div>
      <div>
        <f-checkbox-group v-model="checkboxGroup">
          <f-checkbox label="A"></f-checkbox>
          <f-checkbox label="B"></f-checkbox>
          <f-checkbox label="C"></f-checkbox>
        </f-checkbox-group>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="item">
      <div class="title">输入框 Input</div>
      <f-input v-model="input"></f-input>
    </div>
    <!-- 车牌输入 -->
    <div class="item">
      <div class="title">车牌输入 InputCarPlate</div>
      <f-input-car-plate v-model="carPlate"></f-input-car-plate>
    </div>
  </div>
</template>

<script>

import FButton from './components/button/index.vue'
import FDialog from './components/dialog/index.vue'
import FInputCarPlate from './components/input-car-plate/index.vue'
import FCheckboxGroup from './components/checkbox-group/index.vue'
import FCheckbox from './components/checkbox/index.vue'
import FInput from './components/input/index.vue'
import FMessage from './components/message/index.js'

import { provide, reactive, ref, watch } from 'vue'

export default {
  name: 'App',
  data () {
    return {
      dialogVisible: false,
      carPlate: '',
      checkboxGroup: ['A', 'B'],
      checkbox: true,
      input: ''
    }
  },
  components: {
    FButton,
    FDialog,
    FInputCarPlate,
    FCheckboxGroup,
    FCheckbox,
    FInput
  },
  watch: {
    carPlate (val, oldVal) {
      console.log(val, oldVal)
    }
  },
  methods: {
    handleShowDialog (e) {
      this.dialogVisible = true
    },
    handleCloseDialog (e) {
      this.dialogVisible = false
    },
    handleShowMessage (type, message = '') {
      FMessage({
        type: type,
        message: message,
        duration: 3000
      })
    }
  },
  setup () {
    
  }
}
</script>

<style lang="scss" scoped>
.item {
  box-shadow: 0 0 10px 0 #cccccc;
  padding: 0 24px 24px;
  margin-bottom: 16px;
  .title {
    font-weight: bold;
    font-size: 18px;
    color: #666666;
    border-bottom: 1px solid #eeeeee;
    padding: 8px 0;
    margin-bottom: 8px;
  }
}
.f-button {
  margin-right: 8px;
}
.f-checkbox-group {
  margin-top: 16px;
}
</style>
