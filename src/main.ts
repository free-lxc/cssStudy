import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import draggable from "vuedraggable"
import router from "@/route/index.ts"

const app = createApp(App)
app.component("draggable", draggable)
app.use(router)
app.mount("#app")
