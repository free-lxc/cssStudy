<template>
  <div>
    {{ age }}
    <button @click="emits('changeAge')">年龄++</button>
    <slot name="test1">11</slot>
  </div>
  <Children v-if="age > 11 && age < 15" :age="age" />
</template>

<script lang="ts" setup>
import { defineEmits, useAttrs, useSlots, toRefs } from "vue"
const props = defineProps<{
  age: number
}>()
const { age } = toRefs(props)
const emits = defineEmits(["changeAge"])
const slots = useSlots()
const attrs = useAttrs()
console.log(slots, attrs, attrs.class, attrs.id)
const doSth = () => {
  console.log(111)
}
defineExpose({ doSth })
</script>

<style lang="less" scoped></style>
