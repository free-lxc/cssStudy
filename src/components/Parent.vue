<template>
  <div>
    <Children
      ref="childRef"
      :age="age"
      @changeAge="changeAge"
      id="1"
      class="children"
    >
      <!-- todo:还有些时间 -->
      <template #test1>
        <div>我是子元素</div>
        <div>1111</div>
        <div>1232</div>
      </template>
    </Children>

    <button @click="doSth1">子元素的事件</button>
  </div>
  <div>ul事件</div>
  <ul>
    <li>1111</li>
    <li>222</li>
    <li>333</li>
  </ul>
  <div>是否会产生空格</div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Children from "./Children.vue"
let age = ref<number>(10)
const changeAge = () => {
  age.value += 1
}
// tag:标记一下
const childRef = ref()
const doSth1 = () => {
  childRef.value.doSth()
}
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
  }
}
</style>
