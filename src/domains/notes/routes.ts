import type { RouteRecordRaw } from "vue-router";

export const notesRoutes: Array<RouteRecordRaw> = [
  {
    path: "/notes",
    name: "notes",
    component: () => import("@/domains/notes/views/Notes.vue"),
    meta: {
      isAuthRequired: true,
    },
  },
  {
    path: "/new-note",
    name: "new-note",
    component: () => import("@/domains/notes/views/NewNote.vue"),
    meta: {
      isAuthRequired: true,
    },
  },
];
