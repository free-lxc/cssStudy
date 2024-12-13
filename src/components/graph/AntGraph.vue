<template>
    <div ref="container" class="graph-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { Graph, Model } from '@antv/x6'

const container = ref(null)
const graph = ref() as any
nextTick(()=>{
    graph.value = new Graph({
        container: container.value!,
    })
    graph.value.fromJSON(model)
    graph.value.on('node:click', ({ e, x, y, node, view }) => {
        window.console.log(e, x, y, node, view);
    })
    graph.value.on('edge:click', ({ e, x, y, edge, view }) => {
        window.console.log(e, x, y, edge, view);
    })
})


const originData = {
    nodes: [
        { id: 'node0', size: 50, x: 1000, y: 500 },
        { id: 'node1', size: 30, x: 100, y: 300 },
        { id: 'node2', size: 15, x: 600, y: 100 },
        { id: 'node3', size: 15, x: 700, y: 700 },
    ],
    edges: [
        { source: 'node0', target: 'node1' },
        { source: 'node0', target: 'node2' },
        { source: 'node0', target: 'node3' },
        { source: 'node1', target: 'node3' },
    ],
}

const getModelFromOriginData = () => {
    const model: Model.FromJSONData = {
        nodes: [],
        edges: [],
    }
    originData.nodes.forEach((item) => {
        model.nodes?.push({
            id: item.id,
            shape: 'circle',
            width: item.size,
            height: item.size,
            x: item.x,
            y: item.y,
            attrs: {
                body: {
                    fill: '#5F95FF',
                    stroke: 'transparent',
                },
            },
        })
    })
    originData.edges.forEach((item) => {
        model.edges?.push({
            source: item.source,
            target: item.target,
            attrs: {
                line: {
                    stroke: '#A2B1C3',
                    strokeWidth: 2,
                    targetMarker: null,
                },
            },
        })
    })
    return model
}
const model = getModelFromOriginData()



</script>

<style scoped>
.graph-container {
    height: 100%;
    width: 100%;
}
</style>