<template>
  <div ref="contentRef" class="content" :class="contentClass">
    <div class="box one"></div>
    <div class="box two"></div>
    <div class="box three"></div>
  </div>

  <div class="num">{{ currentNum }}</div>
</template>

<script lang="ts" setup>
// 红绿灯切换，利用问询模式实现
import { ref } from "vue"
import { TrafficLight } from "@/hooks/index.ts"
const currentNum = ref(0)
const contentRef = ref()
const contentClass = ref("content_green")
const light = new TrafficLight([
  {
    color: "green",
    lasts: 4000,
  },
  {
    color: "yellow",
    lasts: 3000,
  },
  {
    color: "red",
    lasts: 5000,
  },
])

const update = () => {
  const current = light.getCurrentLights()
  currentNum.value = Math.ceil(current.remain / 1000)
  contentClass.value = "content_" + current.color
}
update()
const raf = () => {
  requestAnimationFrame(() => {
    raf()
    update()
  })
}
raf()
</script>

<style lang="less" scoped>
@import url(./index.scss);
</style>
