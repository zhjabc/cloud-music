import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@": resolve("src/renderer/src"),
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          IconsResolver({
            prefix: "icon",
            enabledCollections: ["icon-park"],
          }),
        ],
      }),
      Icons({
        compiler: "vue3",
        autoInstall: true,
      }),
    ],
  },
});
