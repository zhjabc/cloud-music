import { createRouter, createMemoryHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    redirect: "/recommend",
    children: [
      {
        path: "/recommend",
        component: () => import("@/views/Recommend/index.vue"),
      },
      {
        path: "/featured",
        component: () => import("@/views/Featured/index.vue"),
      },
      {
        path: "/podcast",
        component: () => import("@/views/Podcast/index.vue"),
      },
      {
        path: "/follow",
        component: () => import("@/views/Follow/index.vue"),
      },
      {
        path: "/searchResult",
        component: () => import("@/views/SearchResult/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
});

export default router;

export { routes };
