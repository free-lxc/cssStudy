<template>
  <div class="box" ref="box" @mousemove="pointerMove" @mouseout="pointerOut">
    <div class="content g-animation">
      No one’s born being good at all things. You become good at things through
      hard work.
      <div class="text_cut_off">
        You’re not a varsity athlete the first time you play a new sport. You
        don’t hit every note the first time you sing a song.You’ve got to
        practice. The same principle applies to your schoolwork. You might have
        to do a math problem a few times before you get it right.
      </div>
      You might have to read something a few times before you understand it.You
      definitely have to do a few drafts of a paper before it’s good enough to
      hand in.
    </div>
    <div class="g-animation">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam officiis
      sapiente laboriosam aut earum, nostrum culpa facilis quidem, dolorum
      aliquid quos rerum consectetur quisquam.
    </div>

    <div class="g-animation">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam officiis
      sapiente laboriosam aut earum, nostrum culpa facilis quidem.
    </div>
    <div class="g-pointer-1" ref="gPointer1"></div>
    <div class="g-pointer-2" ref="gPointer2"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import _ from "lodash"
import { memoize } from "@/hooks/index.ts"
const gPointer1 = ref<HTMLDivElement>()
const gPointer2 = ref<HTMLDivElement>()
const box = ref<HTMLDivElement>()
const isHovering = ref(false)
const setPosition = (x: number, y: number) => {
  gPointer1.value!.style.left = x - 6 + "px"
  gPointer1.value!.style.top = y - 6 + "px"
  if (!isHovering.value) {
    gPointer2.value!.style.left = x - 21 + "px"
    gPointer2.value!.style.top = y - 21 + "px"
  }
}
const pointerMove = (e: any) => {
  requestAnimationFrame(() => {
    const divPosition = box.value!.getBoundingClientRect()
    setPosition(e.clientX - divPosition.x, e.clientY - divPosition.y)
  })
  const target = e.target
  if (target.classList.contains("g-animation")) {
    isHovering.value = true
    const rect = target.getBoundingClientRect()
    const style = getComputedStyle(target)
    gPointer2.value!.style.height = rect.height + 2 + "px"
    gPointer2.value!.style.width = rect.width + 2 + "px"
    gPointer2.value!.style.borderRadius = style.borderRadius
    gPointer2.value!.style.left = target.offsetLeft - 1 + "px"
    gPointer2.value!.style.top = target.offsetTop - 1 + "px"
  }
  return false
}
const pointerOut = (e: any) => {
  const target = e.target
  if (target.classList.contains("g-animation")) {
    isHovering.value = false

    gPointer2.value!.style.width = `42px`
    gPointer2.value!.style.height = `42px`
    gPointer2.value!.style.borderRadius = `50%`
  }
}

const values = memoize((obj: object) => Object.values(obj))
const obj1 = { a: 1, b: 2, c: 3 }
console.log(values(obj1))
</script>

<style lang="less" scoped>
@import url("./index.scss");
</style>
