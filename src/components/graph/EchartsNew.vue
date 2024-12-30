<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const chartContainer = ref(null);
let chart = null;
const nodes = [
  {
    id: "0",
    name: "Node 0",
    value: 20,
  },
  {
    id: "1",
    name: "Node 1",
    value: 15,
  },
  {
    id: "2",
    name: "Node 2",
    value: 25,
  },
  {
    id: "3",
    name: "Node 3",
    value: 18,
  },
  {
    id: "4",
    name: "Node 4",
    value: 22,
  },
];
const edges = [
  {
    source: "0",
    target: "1",
  },
  {
    source: "0",
    target: "2",
  },
  {
    source: "1",
    target: "3",
  },
  {
    source: "2",
    target: "3",
  },
  {
    source: "2",
    target: "4",
  },
];

const handleNodeClick = (params) => {
  if (params.componentType === "series" && params.dataType === "node") {
    console.log("Node clicked:", params);
    // 在这里添加您想要的节点点击逻辑
  }
};

const initChart = () => {
  if (chartContainer.value) {
    chart = echarts.init(chartContainer.value);

    const option = {
      tooltip: {},
      series: [
        {
          type: "graph",
          layout: "force",
          animation: false,
          draggable: true,
          data: nodes.map((node) => ({
            id: node.id,
            name: node.name,
            value: node.value,
            symbolSize: node.value,
            label: {
              show: true,
            },
          })),
          edges: edges.map((edge) => ({
            source: edge.source,
            target: edge.target,
          })),
          force: {
            repulsion: 100,
            edgeLength: 100,
          },
          emphasis: {
            focus: "adjacency",
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    chart.setOption(option);
    chart.on("click", handleNodeClick);

    const zr = chart.getZr();

    zr.on("mousemove", (event) => {
      const pointInPixel = [event.offsetX, event.offsetY];
      const pointInGrid = chart.convertFromPixel("grid", pointInPixel);

      if (pointInGrid) {
        const dataIndex = chart.getModel().getSeries()[0].getData().indexOf(pointInGrid);
        if (dataIndex >= 0) {
          showButton(event.offsetX, event.offsetY - 30, nodes[dataIndex].name);
        } else {
          hideButton();
        }
      } else {
        hideButton();
      }
    });

    zr.on("mouseout", hideButton);
  }
};

const showButton = (x, y, nodeName) => {
  hideButton(); // 确保之前的按钮被移除
  const button = document.createElement("button");
  button.textContent = "Click me";
  button.style.position = "absolute";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  button.style.zIndex = "1000";
  button.onclick = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
    console.log(`Button clicked for node: ${nodeName}`);
    // 在这里添加您想要的按钮点击逻辑
  };
  chartContainer.value.appendChild(button);
};

const hideButton = () => {
  const button = chartContainer.value.querySelector("button");
  if (button) {
    button.remove();
  }
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", () => {
    chart?.resize();
  });
});

onUnmounted(() => {
  chart?.resize();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
