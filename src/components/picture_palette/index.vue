<template>
  <div class="content" ref="contentRef" @mousemove="handleMousemove">
    <div class="img" v-for="item in images" :key="item">
      <img :src="item" alt="" ref="imgRef" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import _ from "lodash"
import ColorThief from "colorthief"
const colorThief = new ColorThief()
const contentRef = ref()
const gradientColors = ref<string[]>([])
const imgRef = ref()
const images = ref<string[]>([
  "src/assets/img/3840x2160/3840img_1.jpg",
  "src/assets/img/3840x2160/3840img_2.jpg",
  "src/assets/img/3840x2160/3840img_3.jpg",
  "src/assets/img/3840x2160/3840img_4.png",
])
// 封装获取颜色的函数
const updateGradientColors = async (imgElement: HTMLImageElement) => {
  let palette = await colorThief.getPalette(imgElement, 3)
  if (!palette) return
  palette = palette.map((color: number[]) => `rgb(${color.join(",")})`)
  if (JSON.stringify(gradientColors.value) !== JSON.stringify(palette)) {
    gradientColors.value = palette
    contentRef.value.style.background = `linear-gradient(to right bottom, ${gradientColors.value.join(
      ", "
    )})`
  }
}

// 防抖函数
const handleMousemove = _.debounce(async (event: MouseEvent) => {
  const target = event.target as HTMLElement

  // 确保目标是 <img> 元素
  if (!(target instanceof HTMLImageElement)) {
    return
  }
  await updateGradientColors(target)
}, 100) // 延迟 100ms
// 页面加载时初始化背景颜色
onMounted(() => {
  const firstImg = document.querySelector(".img img")
  if (firstImg) {
    firstImg.addEventListener("load", () => {
      updateGradientColors(firstImg as HTMLImageElement)
    })
  }
})
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .img {
    width: 40%;
    height: auto;
    margin: 10px 0;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
