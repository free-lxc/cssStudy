<template>
  <div ref="container" class="graph-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import G6 from '@antv/g6'

const container = ref(null)
let graph = null

const data = {
  nodes: [
    { id: 'node1', label: '节点1' },
    { id: 'node2', label: '节点2' },
    { id: 'node3', label: '节点3' },
    { id: 'node4', label: '节点4' },
    { id: 'node5', label: '节点5' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node4' },
    { source: 'node3', target: 'node4' },
    { source: 'node4', target: 'node5' },
  ],
}

onMounted(() => {
  const width = container.value.scrollWidth
  const height = container.value.scrollHeight || 500

  // 注册自定义节点
  G6.registerNode('custom-node', {
    draw (cfg, group) {
      const outerR = 20
      const innerR = 12
      const { label } = cfg

      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: outerR,
          fill: '#C6E5FF',
          stroke: '#5B8FF9',
          lineWidth: 2,
        },
        name: 'outer-circle',
      })

      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: innerR,
          fill: '#5B8FF9',
        },
        name: 'inner-circle',
      })

      if (label) {
        group.addShape('text', {
          attrs: {
            x: 0,
            y: outerR + 10,
            text: label,
            textAlign: 'center',
            textBaseline: 'middle',
            fill: '#666',
            fontSize: 12,
          },
          name: 'label',
        })
      }

      return keyShape
    },
  })


  graph = new G6.Graph({
    container: container.value,
    width,
    height,
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: 100,
    },
    defaultNode: {
      type: 'custom-node',
      size: 40,
    },
    defaultEdge: {
      size: 1,
      color: '#e2e2e2',
    },
  })

  graph.data(data)
  graph.render()

  graph.on('node:dragstart', function (e) {
    window.console.log(111);
    graph.layout();
    refreshDragedNodePosition(e);
  });
  graph.on('node:drag', function (e) {
    window.console.log(222);
    refreshDragedNodePosition(e);
  });
  graph.on('node:dragend', function (e) {
    window.console.log(333);
    e.item.get('model').fx = null;
    e.item.get('model').fy = null;
  });

  // 添加鼠标悬停效果
  // graph.on('node:mouseenter', (e) => {
  //   window.console.log('悬浮');
  //   const node = e.item
  //   graph.setItemState(node, 'hover', true)
  // })

  // graph.on('node:mouseleave', (e) => {
  //   window.console.log('走了');
  //   const node = e.item
  //   graph.setItemState(node, 'hover', false)
  // })

  function refreshDragedNodePosition (e) {
    var model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }
})

onUnmounted(() => {
  if (graph) {
    graph.destroy()
  }
})
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
