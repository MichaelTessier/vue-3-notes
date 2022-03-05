import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import { authRoutes } from "@/domains/auth/routes";
import { notesRoutes } from "@/domains/notes/routes";

import type { AuthStore } from "@/domains/auth/composables/useAuthStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  ...authRoutes,
  ...notesRoutes,
];

export const routerExtend = (authStore: AuthStore) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const authState = await authStore.getState();

    if (to.meta.isAuthRequired && !authState.isAuthenticated) {
      next({
        name: "home",
      });

      return;
    }
    next();
  });

  return router;
};
