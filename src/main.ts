import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firebaseApp } from "@/config/firebase";
firebaseApp();

const app = createApp(App);
app.use(router);
app.mount("#app");
