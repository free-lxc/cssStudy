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
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection?.getRangeAt(0)
    if (range.collapsed) return
    let wrapper
    switch (val) {
      case "bold":
        wrapper = document.createElement("strong")
        break
      case "italic":
        wrapper = document.createElement("i")
        break
      case "underline":
        wrapper = document.createElement("u")
        break
      default:
        break
    }
    if (wrapper) {
      wrapper?.appendChild(range.extractContents())
      range.insertNode(wrapper)

      selection?.removeAllRanges()
      const newRange = document.createRange()
      newRange.setStartAfter(wrapper)
      selection.addRange(newRange)
    }
  }
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
