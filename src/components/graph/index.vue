<template>
  <div class="graph" ref="graphRef"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { nextTick, ref } from 'vue';
import { graphData } from './data';
const graphRef = ref()
const isClick = ref(false)
const currentIndex = ref(-1)
const option = {
    title:{
        text: '知识图谱',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
    },
    // backgroundColor: '#040f23',
    tooltip: {},
    animationDurationUpdate: function (idx: any) {
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
        data: graphData.data,
        // 数据之间的关系
        links: graphData.links,
        cursor: 'pointer',
        itemStyle:{
            normal:{
                color: function (params: any) {
                    return '#73c0de'
                }
            }
        },
        // 聚焦是否高亮
        emphasis: {
            focus: 'adjacency',
            lineStyle: {
                width: 10,
                color: 'red'
            },
            label: {
                formatter: function (params: any) {
                    return params.name
                }
            },
            blurScope: 'series'
        },
        // 淡出状态的图形样式
        blur:{
            lineStyle:{
                color: '#000',
                width: 10,
                type: 'dashed'
            }
        },
        // 选中的情况
        // selectMode: 'single',
        // // 未被选中状态
        // select: {
        //     disabled: true,
        //     itemStyle: {
        //         color: "#0082f9",
        //         borderColor: "#040f23",
        //         borderWidth: 10,
        //     },
        //     lineStyle:{
        //         width: 10
        //     }
        // },
    }]
}

const initEcharts = () => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(graphRef.value);
    // 绘制图表
    myChart.setOption(option);
    // 点击事件
    myChart.on('click', function (params) {
        currentIndex.value = params.dataIndex
        console.log("🚀 ----------------------------------------🚀")
        console.log("🚀 ~ file: index.vue:99 ~ params:", params)
        console.log("🚀 ----------------------------------------🚀")
        isClick.value = true
    });
    myChart.on('mouseout', function (params) {
        window.console.log(2222);
        if(isClick.value){
            if (params.dataType === 'node') {
                myChart.dispatchAction({
                    type: "highlight",
                    dataIndex: [currentIndex.value]
                });
            // } else {
            //     myChart.dispatchAction({
            //         type: "highlight",
            //         dataIndex: currentIndex.value
            //     });
            }
            isClick.value = false
        } else if (currentIndex.value !== -1) {
                myChart.dispatchAction({
                    type: "downplay",
                    dataIndex: currentIndex.value
                });
                currentIndex.value = -1
        }
    })
    // myChart.on('mouseover', function (params) {
    //     console.log("🚀 ~ file: index.vue:128 ~ params:", params, 'currentIndex.value', currentIndex.value)
    //     if(params.dataIndex === currentIndex.value){
    //         myChart.dispatchAction({
    //             type: "highlight",
    //             dataIndex: params.dataIndex
    //         });
    //         currentIndex.value === -1
    //     }else if (currentIndex.value !== -1) {
    //         isClick.value = false
    //         myChart.dispatchAction({
    //             type: "downplay",
    //             dataIndex: currentIndex.value
    //         });
    //         myChart.dispatchAction({
    //             type: "highlight",
    //             dataIndex: params.dataIndex
    //         });
    //         currentIndex.value = params.dataIndex
    //     }
    // })
    // 点击空白事件
    myChart.getZr().on('click', function(event){
        if(!event.target){
            console.log("🚀 ~ 点击到空白的地方了", );
            if (currentIndex.value !== -1){
                isClick.value = false
                myChart.dispatchAction({
                    type: "downplay",
                    dataIndex: currentIndex.value
                });
                currentIndex.value = -1
            }
        }
    })
}
nextTick(()=>{
    initEcharts()
})
</script>

<style lang="scss" scoped>
.graph{
    height: 100%;
    width: 100%;
    background-color: gray;
}
</style>
