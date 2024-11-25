import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import ProtectedPage from "../components/ProtectedPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
  {
    path: "/protected",
    name: "ProtectedPage",
    component: ProtectedPage,
    beforeEnter: (to, from, next) => {
      // 检查登录状态，只有登录后才能访问
      if (localStorage.getItem("isLoggedIn") === "true") {
        next();
      } else {
        alert("Please log in first.");
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
