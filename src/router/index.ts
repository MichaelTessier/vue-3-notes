import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import { authRoutes } from "@/domains/auth/routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
