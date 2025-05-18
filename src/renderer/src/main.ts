import "./assets/main.css";
import "@icon-park/vue-next/styles/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();

import router from "./router";

createApp(App).use(router).use(pinia).mount("#app");
