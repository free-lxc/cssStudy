<template>
  <div>
    你好，我的名字是 {{ name }}，<button @click="push(name)">点击</button>
    {{ personName }}, 1111 {{ personValue.name.value }}, 2222 {{ person.name }}
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRef, toRefs } from "vue";
const name = ref<string>("lx");
const push = (name: string): void => {
  alert(name);
};

const person = reactive({
  name: "lx",
  age: 18,
});
const personName = toRef(person, "name");
const personValue = toRefs(person);
console.log(personName.value, personValue.name.value);
</script>

<style lang="less" scoped>
</style>