import { createApp } from "vue";
import App from "./App.vue";
import { routerExtend } from "./router";
import { firebaseApp } from "@/config/firebase";
import { AuthStore } from "@/domains/auth/composables/useAuthStore";
firebaseApp;

const app = createApp(App);
const authStore = new AuthStore();
const router = routerExtend(authStore);

app.use(router);
app.use(authStore);
app.mount("#app");
