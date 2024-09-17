<template>
  <div class="content" :data-theme="theme">
    <div class="content_box">
      <el-button type="primary" @click="changeTheme">{{
        theme === "dark" ? "暗色" : "亮色"
      }}</el-button>
      <div>我不知道的是从哪里过来的111111111</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
const theme = ref<string | null>("white")
const changeTheme = () => {
  theme.value = theme.value === "dark" ? "white" : "dark"
  localStorage.setItem("theme", theme.value)
}
onMounted(() => {
  theme.value = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "white"
})
</script>

<style lang="less" scoped>
@import url(./index.scss);
.content {
  height: 100%;
  width: 100%;
  .content_box {
    height: 100%;
    width: 100%;
    color: var(--text-color);
    background-color: var(--bg1);
  }
  .el-button {
    background-color: var(--bg2);
    color: var(--text-color);
  }
}
</style>
