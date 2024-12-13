<template>
    <div class="graph_main">
        <el-button type="primary" @click="selectChange(1)">dataOne</el-button>
        <el-button type="primary" @click="selectChange(2)">dataTwo</el-button>
        <el-button type="primary" @click="selectChange(3)">Ant</el-button>
        <el-button type="primary" @click="selectChange(4)">X6</el-button>
        <el-button type="primary" @click="selectChange(5)">G6</el-button>
        <el-button type="primary" @click="selectChange(6)">G6</el-button>
        <dataOne v-if="selected === 1" />
        <dataTwo v-else-if="selected === 2" />
        <AntGraph v-else-if="selected === 3" />
        <chatgpt v-else-if="selected === 4" />
        <G6 v-else-if="selected === 5" />
        <X6 v-else-if="selected === 5" />
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import dataOne from './dataOne.vue';
import dataTwo from './dataTwo.vue';
import AntGraph from './AntGraph.vue';
import chatgpt from './chatgpt.vue';
import G6 from './G6.vue'
import X6 from './X6.vue';
const selected = ref(4);
const selectChange = (val: number) => {
    selected.value = val;
};
</script>

<style lang="scss" scoped>
.el-button{
    float: left;
    margin: 20px;
}
.graph_main{
    height: 100%;
    width: 100%;
}
</style>
