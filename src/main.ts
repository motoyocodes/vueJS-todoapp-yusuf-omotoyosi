import { createApp } from "vue";
import App from "./App.vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import router from "./router";
import "./assets/global.css";

const app = createApp(App);

const queryClient = new QueryClient();

// Register Vue Query plugin
app.use(VueQueryPlugin, { queryClient });

// Register Vue Router
app.use(router);

app.mount("#app");
