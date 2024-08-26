<template>
  <h3>视差滚动效果实现</h3>
  <!-- <el-button type="primary">Primary</el-button>
  <el-scrollbar height="200px">
    <section>1</section>
    <section class="img1">2</section>
    <section>3</section>
    <section class="img3">6</section>
  </el-scrollbar> -->
  <Transform3D />
</template>

<script lang="ts" setup>
import Transform3D from "./Transform3D.vue"
</script>

<style lang="scss" scoped>
section {
  height: 200px;
  width: 200px;
  color: #f30707;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}

.img1 {
  background-image: url("https://picsum.photos/800");
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
}

.img3 {
  background-image: url("https://picsum.photos/1200");
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
}
</style>
