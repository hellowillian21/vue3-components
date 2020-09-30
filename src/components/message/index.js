import { defineComponent, createVNode, render } from 'vue'
import Main from './main.vue'

const MessageConstructor = defineComponent(Main)

let instance
const instances = []
const getId = function* () {
  let id = 0
  while (true) {
    id++
    const idStr = `fMessage${id}`
    yield idStr
  }
}

const getIdIterator = getId()

const Message = function (options) {
  options = options || {}

  let verticalOffset = 8
  const id = getIdIterator.next().value
  instances.forEach((item) => {
    verticalOffset += item.el.offsetHeight + 8
  })
  options = {
    ...options,
    verticalOffset: verticalOffset,
    onClose: () => {
      Message.handleClose(id)
    }
  }

  instance = createVNode(
    MessageConstructor,
    options
  )
  const container = document.createElement('div')
  render(instance, container)

  instance.el.id = id
  document.body.appendChild(instance.el)
  instances.push(instance)

  return instance
}

Message.handleClose = (id) => {
  // 删除到期的一项
  instances.forEach((item, index) => {
    if (id === item.el.id) {
      instances.splice(index, 1)
    }
  })

  // 调整其他项位置
  instances.forEach((item) => {
    const top = parseInt(item.el.style.top) - item.el.offsetHeight - 8
    item.el.style.top = `${top}px`
  })
}

export default Message