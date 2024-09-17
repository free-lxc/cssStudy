import {
  createRouter,
  createWebHashHistory,
  //   createWebHistory,
} from "vue-router"
import OutContentVue from "@/components/OutContent.vue"
import helloWord from "@/components/HelloWorld.vue"
import Children from "@/components/Children.vue"
import VueFlowRealize from "@/components/vueFlowRealize/index.vue"
import JsDff from "@/components/JsDff/index.vue"
import TrafficLight from "@/components/trafficLight/index.vue"
import ThemeSwitch from "@/components/css_theme_switching/index.vue"
import PicturePalette from "@/components/picture_palette/index.vue"
import ScreenWindow from "@/components/screen_window_communication/index.vue"
const routes = [
  {
    path: "/OutContentVue",
    component: OutContentVue,
  },
  {
    path: "/",
    component: helloWord,
  },
  {
    path: "/children",
    component: Children,
  },
  {
    path: "/vueFlowRealize",
    component: VueFlowRealize,
  },
  {
    path: "/jsDff",
    component: JsDff,
  },
  {
    path: "/trafficLight",
    component: TrafficLight,
  },
  {
    path: "/themeSwitch",
    component: ThemeSwitch,
  },
  {
    path: "/picturePalette",
    component: PicturePalette,
  },
  {
    path: "/screenWindow",
    component: ScreenWindow,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
