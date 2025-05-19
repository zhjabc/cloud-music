import "./assets/main.css";
import "@icon-park/vue-next/styles/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import router from "./router";

createApp(App).use(router).use(pinia).mount("#app");
