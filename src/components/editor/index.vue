<template>
  <el-button type="primary" @click="newOld = !newOld">{{
    newOld ? "旧的" : "新的"
  }}</el-button>
  <Old v-if="newOld" />
  <New v-else />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Old from "./old.vue"
import New from "./new.vue"
const newOld = ref(false)
</script>

<style lang="scss" scoped></style>
