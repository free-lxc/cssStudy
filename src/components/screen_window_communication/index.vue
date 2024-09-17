<template>
  <div class="content" ref="contentRef">
    <img
      :src="board"
      alt=""
      ref="imgRef"
      @mousedown.stop="handleMousedown"
      @mousemove.stop="handleMousemove"
      @mouseup.stop="handleMouseup"
      @mouseleave="handleMouseup"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()
const contentRef = ref()
const imgRef = ref()
const board = ref("")
const isDragging = ref(false)
const initMouse = ref({ x: 0, y: 0 })
const rect = ref()
// 求导航条的高度
const barHeight = () => {
  const width = window.outerWidth - window.innerWidth
  const height = window.outerHeight - window.innerHeight
  return [width, height]
}
// 求坐标信息-屏幕坐标转视口坐标
const clientToScreen = (clientX: number, clientY: number) => {
  const screenX = clientX + window.screenX + barHeight()[0]
  const screenY = clientY + window.screenY + barHeight()[1]
  console.log(screenX, screenY, "屏幕", window.screenX, window.screenY)
  return [screenX, screenY]
}
// 视口坐标转屏幕坐标
const screenToClient = (screenX: number, screenY: number) => {
  rect.value = contentRef.value.getBoundingClientRect()
  const clientX = screenX - window.screenX - barHeight()[0]
  const clientY = screenY - window.screenY - barHeight()[1]
  console.log(clientX, clientY, "视口", window.screenX, window.screenY)
  return [clientX, clientY]
}

const channel = new BroadcastChannel("mouse-channel")
channel.onmessage = (e) => {
  const [x, y] = screenToClient(...e.data)
  imgRef.value.style.left = x + "px"
  imgRef.value.style.top = y + "px"
}
const handleMousedown = (event: MouseEvent) => {
  event.preventDefault()
  isDragging.value = true
  initMouse.value.x = event.offsetX
  initMouse.value.y = event.offsetY
  return false
}
const handleMousemove = (event: MouseEvent) => {
  if (!isDragging.value || !event.target) return
  rect.value = contentRef.value.getBoundingClientRect()
  const x = event.clientX - rect.value.left - initMouse.value.x
  const y = event.clientY - rect.value.top - initMouse.value.y
  // 确保图像不超出容器边界
  imgRef.value.style.left = x + "px"
  imgRef.value.style.top = y + "px"
  console.log(imgRef.value.style.left, imgRef.value.style.top)
  const points = clientToScreen(x, y)
  channel.postMessage(points)
}
const handleMouseup = () => {
  isDragging.value = false
}
onUpdated(() => {
  board.value = "src/assets/img/board/board_" + route.query.name + ".jpg"
})
onMounted(() => {
  board.value = "src/assets/img/board/board_" + route.query.name + ".jpg"
})
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  width: 100%;
  position: relative;
  border: 1px solid gray;
}
img {
  position: absolute;
  height: 400px;
  width: 400px;
  left: 0;
  top: 0;
  border: 1px solid black;
}
</style>
