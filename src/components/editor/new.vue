<template>
  <el-button type="success" round @click="exec('bold')">加粗</el-button>
  <el-button type="success" round @click="exec('italic')"
    >斜体</el-button
  >
  <el-button type="success" round @click="exec('underline')"
    >下划线</el-button
  >

  <div class="editor-contain" contenteditable="true">
    <p>这是一个输入编辑器</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const selection = window.getSelection()
const controlText = (val: string) => {
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

     // 清除选区，并更新光标
      selection?.removeAllRanges()
      const newRange = document.createRange()
      newRange.setStartAfter(wrapper)
      selection.addRange(newRange)
    }
  }
}
// 检查当前选区是否已经被包装指定格式
const isWrapped = (range: Range, command: any)=>{
    let container = range.commonAncestorContainer
    if(container.nodeType === Node.TEXT_NODE && container.parentNode){
        container = container.parentNode
    }
    while(container && container.nodeName !== 'MAIN' && container.parentNode){
        console.log("🚀 ~ isWrapped ~ container:", container, container.nodeName)
        switch(command){
            case 'bold':
                if(container.nodeName === 'B' || container.nodeName === 'STRONG')
                    return true
                break
            case 'italic':
                if(container.nodeName === 'I' || container.nodeName === 'EM')
                    return true
                break
            case 'underline':
                if(container.nodeName === 'U')
                    return true
                break
            default:
                return false
        }
        container = container.parentNode
    }
    return false
}
const unwrap = (range: Range, command: any)=> {
    let container = range.commonAncestorContainer;
    if (container.nodeType === Node.TEXT_NODE && container.parentNode) {
        container = container.parentNode;
    }
    function unwrapNode(node: any) {
        if (!node) return;
        const parentNode = node.parentNode;
        if (!parentNode) return;
        if ((command === "bold" &&(node.nodeName === "B" || node.nodeName === "STRONG")) ||
                (command === "italic" &&
                (node.nodeName === "I" || node.nodeName === "EM")) ||
                (command === "underline" && node.nodeName === "U")
            ) {
                const beforeRange = document.createRange();
                beforeRange.setStartBefore(node);
                beforeRange.setEnd(range.startContainer, range.startOffset);

                const afterRange = document.createRange();
                afterRange.setStart(range.endContainer, range.endOffset);
                afterRange.setEndAfter(node);

                if (!beforeRange.collapsed) {
                    const beforeNode = document.createDocumentFragment();
                    beforeNode.appendChild(beforeRange.extractContents());
                    parentNode.insertBefore(beforeNode, node);
                    }
                if (!afterRange.collapsed) {
                    const afterNode = document.createDocumentFragment();
                    afterNode.appendChild(afterRange.extractContents());
                    parentNode.insertBefore(afterNode, node.nextSibling);
                }
                    const selectedContents = range.extractContents();
                    parentNode.insertBefore(selectedContents, node);
                    parentNode.removeChild(node);
            }else {
                unwrapNode(node.parentNode);
                }
    }
    unwrapNode(container)
}
const exec = (command: any, extra?: any)=>{
    if(!selection) return
    const range = selection.getRangeAt(0)
    const isContentWrapped = isWrapped(range, command)
    if(isContentWrapped){
        unwrap(range, command)
    }else{
        let wrapper
        if (range.collapsed) return
        switch (command) {
            case "bold":
                wrapper = document.createElement("b")
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
        if(!wrapper) return
        wrapper.appendChild(range.extractContents())
        range.insertNode(wrapper)
        // 合并相邻的相同格式标签
        // mergeAdjacentTextNodes(wrapper)
    }
    // updateSelectionAfterCommand(range)
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
