import type { RouteRecordRaw } from "vue-router";

export const authRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/domains/auth/views/Login.vue"),
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () => import("@/domains/auth/views/SignUp.vue"),
  },
];
