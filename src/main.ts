import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import ElementPlus from "element-plus"
import draggable from "vuedraggable"
import "element-plus/dist/index.css"
import router from "@/route/index.ts"

const app = createApp(App)
app.component("draggable", draggable)
app.use(router)
app.use(ElementPlus)
app.mount("#app")
