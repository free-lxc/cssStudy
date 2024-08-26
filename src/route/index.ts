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
import ParallaxScrolling from "@/components/parallaxScrolling/index.vue"
const routes = [
  {
    path: "/OutContentVue",
    component: OutContentVue,
  },
  {
    path: "/hello",
    component: helloWord,
  },
  {
    path: "/children",
    component: Children,
  },
  {
    path: "/",
    component: VueFlowRealize,
  },
  {
    path: "/jsDff",
    component: JsDff,
  },
  {
    path: "/parallaxScrolling",
    component: ParallaxScrolling,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
