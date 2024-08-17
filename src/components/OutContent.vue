<template>
  <div class="content">
    <div class="outContent"></div>
    <ul>
      <li>111</li>
      <li>222</li>
      <li>111</li>
      <li>222</li>
      <li>111</li>
      <li>222</li>
      <li>111</li>
      <li>222</li>
      <li>111</li>
      <li>222</li>
      <li>111</li>
      <li>222</li>
      <li>111</li>
      <li>222</li>
    </ul>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
body {
  margin: 0 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  height: 200px;
  width: 200px;
  border: 1px solid black;
  position: relative;
  .outContent {
    position: absolute;
    top: 10px;
    left: -50px;
    height: 100px;
    width: 100px;
    border: 1px solid red;
  }
  ul {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
