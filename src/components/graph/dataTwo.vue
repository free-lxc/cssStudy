<template>
    <div class="chart-container" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import _ from 'lodash'
import * as echarts from 'echarts'

const chartContainer = ref(null)
let chart = null

// 图数据
const graphData = reactive({
    nodes: [
        { id: '1', name: '张三', symbolSize: 50, x: 10, y: 5 },
        { id: '2', name: '李四', symbolSize: 30, x: 20, y: 10 },
        { id: '3', name: '王五', symbolSize: 30, x: 30, y: 20 },
        { id: '4', name: '赵六', symbolSize: 30, x: 10, y: 65 },
        { id: '5', name: '钱七', symbolSize: 30, x: 40, y: 30 },
        { id: '6', name: '孙八', symbolSize: 20, x: 50, y: 40 },
        { id: '7', name: '周九', symbolSize: 20, x: 60, y: 50 },
    ],
    links: [
        { source: '1', target: '2' },
        { source: '1', target: '3' },
        { source: '1', target: '4' },
        { source: '1', target: '5' },
        { source: '5', target: '6' },
        { source: '5', target: '7' },
    ]
})

// 当前显示的节点和连接
const visibleNodes = ref([])
const visibleLinks = ref([])

// 存储每个节点的相关节点
const nodeRelations = reactive({})

// 存储折叠状态
const collapsedNodes = reactive({})

// 初始化节点关系
function initNodeRelations () {
    graphData.nodes.forEach(node => {
        nodeRelations[node.id] = new Set()
    })
    graphData.links.forEach(link => {
        nodeRelations[link.source].add(link.target)
        nodeRelations[link.target].add(link.source)
    })
}

// 初始化可见节点和连接
function initVisibleData () {
    visibleNodes.value = _.cloneDeep(graphData.nodes)
    visibleLinks.value = _.cloneDeep(graphData.links)
    initNodeRelations()
}
// 判断当前节点是否被折叠过
const isNodeCollapsed = nodeId => {
    window.console.log(visibleLinks.value, 'visibleLinks.value', graphData.links, 'graphData.links');
    const arr1 = visibleLinks.value.filter((link) => link.source === nodeId || link.target === nodeId)
    const arr2 = graphData.links.filter((link) => link.source === nodeId || link.target === nodeId)
    return arr1.length === arr2.length
}
// 展开或折叠节点
function toggleNode (nodeId) {
    const temptCollapsed = isNodeCollapsed(nodeId)
    console.log("🚀 ~ temptCollapsed:", temptCollapsed)

    if (!temptCollapsed) {
        // 展开节点
        expandNode(nodeId)
    } else {
        // 折叠节点
        collapseNode(nodeId)
    }
    updateChart()
}

// 折叠节点
function collapseNode (nodeId) {
    const nodesToHide = new Set(nodeRelations[nodeId])
    console.log("🚀 ~ nodesToHide:", nodesToHide, 'nodeId', nodeId)

    visibleNodes.value = visibleNodes.value.filter(node => !nodesToHide.has(node.id))
    visibleLinks.value = visibleLinks.value.filter(link =>
        !(link.source === nodeId || link.target === nodeId) && !(nodesToHide.has(link.source) || nodesToHide.has(link.target))
    )
    window.console.log(visibleLinks.value, 'visibleLinks.value');
}

// 展开节点
function expandNode (nodeId) {
    const nodesToShow = new Set(nodeRelations[nodeId])
    console.log("🚀 ~ nodesToShow:", nodesToShow)


    const newNodes = graphData.nodes.filter(node => nodesToShow.has(node.id) && !visibleNodes.value.some(n => n.id === node.id))
    visibleNodes.value = [...visibleNodes.value, ...newNodes]
    console.log("🚀 ~ visibleNodes.value:", visibleNodes.value)


    const newLinks = graphData.links.filter(link =>
        (link.source === nodeId || link.target === nodeId || nodesToShow.has(link.source) || nodesToShow.has(link.target)) &&
        !visibleLinks.value.find(l => l.source === link.source && l.target === link.target)
    )
    visibleLinks.value = [...visibleLinks.value, ...newLinks]
    console.log("🚀 ~ visibleLinks.value:", visibleLinks.value)

}

// 检查并展开被折叠的相邻节点
function checkAndExpandCollapsedNeighbors (nodeId) {
    const neighbors = nodeRelations[nodeId]
    let expanded = false

    neighbors.forEach(neighborId => {
        if (collapsedNodes[neighborId]) {
            expandNode(neighborId)
            expanded = true
        }
    })

    return expanded
}

// 更新图表
function updateChart () {
    if (!chart) return
    // window.console.log(visibleNodes.value, 'visibleNodes.value', visibleLinks.value, 'visibleLinks.value');
    const option = {
        title: {
            text: '知识图谱',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        // backgroundColor: '#040f23',
        tooltip: {},
        animationDurationUpdate: function (idx) {
            // 越往后的数据延迟越大
            return idx * 100;
        },
        series: [{
            name: '知识图谱',
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 10,
                edgeLength: 10
            },
            roam: true, // 允许拖拽节点
            draggable: true,
            label: {
                show: true,
                position: 'bottom',
                formatter: '{c}' + '{b}',
                fontSize: 16,
                fontStyle: '400',
            },
            data: visibleNodes.value,
            // 数据之间的关系
            links: visibleLinks.value,
            cursor: 'pointer',
            itemStyle: {
                normal: {
                    color: function (params) {
                        return '#73c0de'
                    }
                }
            },
            // 聚焦是否高亮
            emphasis: {
                focus: 'adjacency',
                lineStyle: {
                    width: 5
                },
                label: {
                    formatter: function (params) {
                        return params.name
                    }
                },
                blurScope: 'series'
            },
            // 淡出状态的图形样式
            blur: {
                lineStyle: {
                    color: '#000',
                    width: 10,
                    type: 'dashed'
                }
            }
        }]
    }

    chart.setOption(option)
}

onMounted(() => {
    if (chartContainer.value) {
        chart = echarts.init(chartContainer.value)

        chart.on('click', params => {
            if (params.dataType === 'node') {
                const nodeId = params.data.id
                const expandedCollapsedNeighbor = checkAndExpandCollapsedNeighbors(nodeId)

                    toggleNode(nodeId)

                updateChart()
            }
        })

        initVisibleData()
        updateChart()

        window.addEventListener('resize', handleResize)
    }
})

onUnmounted(() => {
    if (chart) {
        chart.dispose()
        window.removeEventListener('resize', handleResize)
    }
})

function handleResize () {
    if (chart) {
        chart.resize()
    }
}
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
</style>
