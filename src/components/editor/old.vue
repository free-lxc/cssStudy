<template>
  <el-button type="success" round @click="controlText('bold')">加粗</el-button>
  <el-button type="success" round @click="controlText('italic')"
    >斜体</el-button
  >
  <el-button type="success" round @click="controlText('underline')"
    >下划线</el-button
  >

  <div class="editor-contain" contenteditable="true">
    <p>这是一个输入编辑器</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const controlText = (val: string) => {
  document.execCommand(val)
}
</script>

<style lang="scss" scoped>
.editor-contain {
  height: 300px;
  width: 80%;
  margin: 30px auto;
  border: 1px solid black;
  &:focus {
    border-color: blue;
    outline: none;
  }
}
</style>
