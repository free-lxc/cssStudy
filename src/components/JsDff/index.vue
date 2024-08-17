<template>
  <div class="diff">
    <div v-html="addedHtml"></div>
    <div v-html="removedHtml"></div>
  </div>
</template>

<script lang="ts" setup>
import diffJSON from "./jsDff"
import dataObj from "./data.ts"

const [json1, json2] = dataObj

const { addedHtml, removedHtml } = diffJSON(json1, json2)
</script>

<style lang="scss" scoped>
.diff {
  height: auto;
  width: 600px;
  display: flex;
  // align-items: center;
  justify-content: space-between;
}
.error-line-remove {
  background-color: rgb(248, 216, 216);
  position: relative;

  &::before {
    content: "-";
    position: absolute;
    left: 5px;
    color: black;
    line-height: 19.5px;
  }
}

.error-line-add {
  background-color: rgb(226, 248, 216);
  position: relative;

  &::before {
    content: "+";
    position: absolute;
    left: 5px;
    color: black;
    line-height: 19.5px;
  }
}
</style>
