<template>
  <div class="graph-container">
    <div ref="container" class="graph"></div>
    <div class="controls">
      <button @click="toggleAnimation" class="control-button">
        {{ isAnimating ? '暂停' : '开始' }} 动画
      </button>
      <button @click="resetLayout" class="control-button">
        重置布局
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Graph, Shape } from '@antv/x6'
import { ForceLayout, CircularLayout, GridLayout, DagreLayout, Force2Layout } from '@antv/layout'

const container = ref(null)
const isAnimating = ref(false)
let graph = null
let layout = null
const dataList = ref({
  nodes: [],
  edges: []
})
function initGraph () {
  graph = new Graph({
    container: container.value,
    width: 800,
    height: 600,
    grid: true,
    panning: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: 100,
    },
  })

  const nodes = [
    { id: 'node1', label: '节点1' },
    { id: 'node2', label: '节点2' },
    { id: 'node3', label: '节点3' },
    { id: 'node4', label: '节点4' },
    { id: 'node5', label: '节点5' },
    { id: 'node6', label: '节点6' },
    { id: 'node7', label: '节点7' },
    { id: 'node8', label: '节点8' },
  ]

  const edges = [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node4' },
    { source: 'node3', target: 'node4' },
    { source: 'node4', target: 'node5' },
    { source: 'node5', target: 'node6' },
    { source: 'node6', target: 'node7' },
    { source: 'node7', target: 'node8' },
    { source: 'node8', target: 'node1' },
  ]

  nodes.forEach((node, index) => {
    dataList.value.nodes.push({
      id: node.id,
      shape: 'circle',
      width: 60,
      height: 60,
      // x: index * 100 * Math.random() + 50,
      // y: index * 100 * Math.random() + 50,
      label: node.label,
      attrs: {
        body: {
          fill: '#5F95FF',
          stroke: '#5F95FF',
        },
        label: {
          fill: '#ffffff',
          fontSize: 12,
        },
      },
    })
  })

  edges.forEach((edge) => {
    dataList.value.edges.push({
      source: edge.source,
      target: edge.target,
      attrs: {
        line: {
          stroke: '#5F95FF',
          strokeWidth: 2,
        },
      },
    })
  })

  const dagreLayout = layoutShape('grid')
  window.console.log(dagreLayout.init, '源码init');
  window.console.log(dagreLayout.execute, '源码execute');
  const model = dagreLayout.layout(dataList.value)
  console.log(dagreLayout.nodes, dagreLayout.edges, dagreLayout, '1111')
  console.log(model, 'model')
  graph.fromJSON({
    nodes: dagreLayout.nodes,
    edges: dagreLayout.edges
  })
  // graph.fromJSON(dataList.value)
}


onMounted(() => {
  initGraph()
})

onUnmounted(() => {
  layout?.destroy()
  graph?.dispose()
})
const layoutShape = (val) => {
  switch (val) {
    case 'force':
      return new ForceLayout({
        type: 'force',
        center: [400, 300],  // 中心位置
        width: 800,          // 容器宽度
        height: 600,         // 容器高度
        linkDistance: 100,   // 调整边的理想长度，增大可以增加节点间距
        nodeStrength: -10,   // 增加节点之间的斥力，增大数值能使节点间距更大
        edgeStrength: 0.8,   // 保持边的吸引力适中
        preventOverlap: true, // 防止节点重叠
        maxIteration: 1000,   // 最大迭代次数
        animated: true,      // 启用动画
      })
    case 'force2':
      return new Force2Layout({
        // center: [0, 0],
        edgeStrength: 0.1,
        coulombDisScale: 10,
        damping: 10,
        maxSpeed: 10,
        linkDistance: 100,
        preventOverlap: true,
        clusterNodeStrength: 10,
        factor: 10
      })
    case 'grid':
      return new GridLayout({
        type: 'grid',
        width: 600,
        height: 400,
        center: [300, 200],
        rows: 4,
        cols: 4,
      })
    case 'circle':
      return new CircularLayout({
        type: 'circular',
        width: 600,
        height: 400,
        center: [300, 200],
        radius: 50,
      })
    case 'dagre':
      return new DagreLayout({
        type: 'dagre',
        rankdir: 'LR',
        align: 'UL',
        ranksep: 30,
        nodesep: 15,
        controlPoints: true,
      })
  }
}
</script>

<style scoped>
.graph-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.graph {
  width: 100%;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.controls {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}

.control-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #5F95FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.control-button:hover {
  background-color: #4a7ddb;
}

@media (max-width: 600px) {
  .graph {
    height: 400px;
  }
}
</style>
