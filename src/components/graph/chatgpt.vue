<template>
  <div class="graph-container">
    <div ref="container" class="graph"></div>
    <div class="controls">
      <button
        @click="toggleAnimation"
        class="control-button"
      >
        {{ isAnimating ? "暂停" : "开始" }} 动画
      </button>
      <button
        @click="resetLayout"
        class="control-button"
      >
        重置布局
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Graph } from "lxOldX6";
import { ForceLayout } from "lxOldLayout";

const container = ref(null);
const isAnimating = ref(false);
let graph = null;
let layout = null;
let animationFrameId = null;

onMounted(() => {
  initGraph();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  layout?.destroy();
  graph?.dispose();
});

function initGraph() {
  graph = new Graph({
    container: container.value,
    width: 800,
    height: 600,
    grid: true,
    panning: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
  });

  const nodes = [
    { id: "node1", label: "节点1" },
    { id: "node2", label: "节点2" },
    { id: "node3", label: "节点3" },
    { id: "node4", label: "节点4" },
    { id: "node5", label: "节点5" },
    { id: "node6", label: "节点6" },
    { id: "node7", label: "节点7" },
    { id: "node8", label: "节点8" },
  ];

  const edges = [
    { source: "node1", target: "node2" },
    { source: "node1", target: "node3" },
    { source: "node2", target: "node4" },
    { source: "node3", target: "node4" },
    { source: "node4", target: "node5" },
    { source: "node5", target: "node6" },
    { source: "node6", target: "node7" },
    { source: "node7", target: "node8" },
    { source: "node8", target: "node1" },
  ];

  nodes.forEach((node) => {
    graph.addNode({
      id: node.id,
      shape: "circle",
      width: 60,
      height: 60,
      label: node.label,
      attrs: {
        body: {
          fill: "#5F95FF",
          stroke: "#5F95FF",
        },
        label: {
          fill: "#ffffff",
          fontSize: 12,
        },
      },
    });
  });

  edges.forEach((edge) => {
    graph.addEdge({
      source: edge.source,
      target: edge.target,
      attrs: {
        line: {
          stroke: "#5F95FF",
          strokeWidth: 2,
        },
      },
    });
  });

  layout = new ForceLayout({
    center: [400, 300],
    width: 800,
    height: 600,
    linkDistance: 100,
    nodeStrength: -30,
    edgeStrength: 0.8,
    preventOverlap: true,
    maxIteration: 1000,
    animated: true,
    nodeSize: 60,
  });

  layout.init({
    nodes: graph.getNodes().map((node) => ({
      id: node.id,
      width: node.getSize().width,
      height: node.getSize().height,
    })),
    edges: graph.getEdges().map((edge) => ({
      source: edge.getSourceCellId(),
      target: edge.getTargetCellId(),
    })),
  });

  // 添加拖拽事件
  graph.on("node:dragstart", ({ node }) => {
    node.set("isBeingDragged", true);
  });

  graph.on("node:drag", ({ node }) => {
    const position = node.getPosition();
    layout.updateNodePosition(node.id, position);
    if (!isAnimating.value) {
      layout.execute();
      updateGraphPositions();
    }
  });

  graph.on("node:dragend", ({ node }) => {
    node.set("isBeingDragged", false);
    if (!isAnimating.value) {
      layout.execute();
      updateGraphPositions();
    }
  });

  // 初始布局
  // resetLayout()
}

function updateGraphPositions() {
  const nodes = graph.getNodes();
  nodes.forEach((node) => {
    const graphNode = graph.getCellById(node.id);
    console.log("🚀 ~ graphNode:", graphNode);
    if (
      graphNode &&
      !graphNode.get("isBeingDragged")
    ) {
      graphNode.position(node.x, node.y);
    }
  });
}

function animate() {
  layout.tick();
  updateGraphPositions();
  animationFrameId =
    requestAnimationFrame(animate);
}

function toggleAnimation() {
  isAnimating.value = !isAnimating.value;
  if (isAnimating.value) {
    animate();
  } else {
    cancelAnimationFrame(animationFrameId);
  }
}

function resetLayout() {
  layout.execute();
  updateGraphPositions();
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
  background-color: #5f95ff;
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
