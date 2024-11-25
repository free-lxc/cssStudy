<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="100px">
        <div class="routerList" v-for="item in routerList" :key="item.path">
          <el-button type="primary" @click="goTo(item.path)">{{
            item.name
          }}</el-button>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter()
const routerList = [
  {
    name: "首页",
    path: "/",
  },
  {
    name: "鼠标动画",
    path: "/vueFlowRealize",
  },
  {
    name: "交通灯问题",
    path: "/trafficLight",
  },
  {
    name: "css主题切换",
    path: "/themeSwitch",
  },
  {
    name: "图片调色盘",
    path: "/picturePalette",
  },
  {
    name: "窗口通信2",
    path: "/screenWindow?name=2",
  },
  {
    name: "窗口通信6",
    path: "/screenWindow?name=6",
  },
  {
    name: "窗口通信a",
    path: "/screenWindow?name=A",
  },
  {
    name: "编辑器",
    path: "/editor",
  },
]
const goTo = (path: string) => {
  router.push(path)
}
</script>

<style lang="less" scoped>
.common-layout {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
    width: 100%;
    .el-aside {
      border-right: 1px solid black;
      .routerList {
        width: 100%;
        padding: 0 10px;
      }
      .el-button {
        margin: 10px 0;
        width: 100%;
      }
    }
  }
}
</style>
