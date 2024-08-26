<template>
  <div class="parallax">
    <div class="parallax__group">
      <div class="parallax__layer parallax__layer--front">🌲</div>
    </div>
    <div class="parallax__group">
      <div class="parallax__layer parallax__layer--base">⛰️</div>
    </div>
    <div class="parallax__group">
      <div class="parallax__layer parallax__layer--back">🌙</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.parallax {
  /* 设置透视效果，为3D变换创造深度感 */
  perspective: 1px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}

.parallax__group {
  position: relative;
  height: 100vh;
  /* 保留子元素3D变换效果 */
  transform-style: preserve-3d;
}

.parallax__layer {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.parallax__layer--back {
  transform: translateZ(-2px) scale(3);
  z-index: 1;
}

.parallax__layer--base {
  transform: translateZ(-1px) scale(2);
  z-index: 2;
}

.parallax__layer--front {
  transform: translateZ(0px);
  z-index: 3;
}
</style>
