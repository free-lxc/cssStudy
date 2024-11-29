import _ from 'lodash'
// 数据
const graphData = {
     data : ['1', '2', '3', '4', '5'].map((item: string, index: number)=>{
    const obj = {
      name: item,
      value: item + "球",
      x: 0,
      y: 0,
      symbolSize: 80,
      draggable: true,
      itemStyle: {
        borderColor: "#03fc62",
        borderWidth: 4,
        shadowBlur: 20,
        shadowColor: "#03fc62",
        color: "#11213b",
      },
      category: item,
    }
    if(index === 3){
        obj.x = 65
        obj.y = 6
    }
    return obj
}),

 links : [
  {
    source: "1",
    target: "2",
    label: {
      show: true,
      position: "middle",
      formatter: function (params: any) {
        return params.name
      },
    },
  },
  {
    source: "1",
    target: "3",
    label: {
      show: true,
      position: "middle",
      formatter: function (params: any) {
        return params.name
      },
    },
  },
  {
    source: "2",
    target: "3",
    label: {
      show: true,
      position: "middle",
      formatter: function (params: any) {
        return params.name
      },
    },
  },
  {
    source: "3",
    target: "4",
    label: {
      show: true,
      position: "middle",
      formatter: function (params: any) {
        return params.name
      },
    },
  },
  {
    source: "4",
    target: "5",
    label: {
      show: true,
      position: "middle",
      formatter: function (params: any) {
        return params.name
      },
    },
  },
]
}

const nodeRelations: any = {} // 存储每个节点的相关节点
const collapsedNodes: any = {} // 折叠状态
const initNodeRelations = ()=>{
    graphData.data.forEach((item: any)=>{
        nodeRelations[item.name] = new Set()
    })
    graphData.links.forEach((item: any) => {
      nodeRelations[item.source].add(item.target)
      nodeRelations[item.target].add(item.source)
    })
}
// 折叠节点
const collapseNode = (name: string)=>{
    collapsedNodes[name] = true
    const nodesToHide = new Set(nodeRelations[name])
}
export {
    graphData,
    initNodeRelations,
}
