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
  instances.forEach((item) => {
    verticalOffset += item.el.offsetHeight + 8
  })
  options = { ...options, verticalOffset: verticalOffset }

  instance = createVNode(
    MessageConstructor,
    options
  )
  const container = document.createElement('div')
  render(instance, container)

  instance.el.id = getIdIterator.next().value
  document.body.appendChild(instance.el)
  const child = document.getElementById(instance.el.id)
  instances.push(instance)

  setTimeout(() => {
    // 删除到期的一项
    instances.forEach((instance, index) => {
      if (instance.el === child) {
        instance.el.classList.add('f-message-out')
        instances.splice(index, 1)
        setTimeout(() => {
          document.body.removeChild(child)
        }, 100);
      }
    })
    // 调整其他项位置
    instances.forEach((instance) => {
      setTimeout(() => {
        instance.el.style.top = `${Number(instance.el.style.top.split('px')[0]) - instance.el.offsetHeight - 8}px`
      }, 100);
    })
  }, options.duration || 1500)
  console.log(instance)
  return instance
}

export default Message