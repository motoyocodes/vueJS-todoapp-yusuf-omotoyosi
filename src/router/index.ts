import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/MainPage.vue";
import TodoPage from "../views/TodoPage.vue";
import TodoDetails from "../views/todo/TodoDetails.vue";
import LoginPage from "../views/LoginPage.vue";
import { useAuth } from "../composables/useAuth";

const routes = [
  { path: "/", component: HomePage },
  {
    path: "/todos",
    component: TodoPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/todos/:id",
    component: TodoDetails,
    props: true,
    meta: { requiresAuth: true },
  },
  { path: "/login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated.value) {
    next("/todos");
  } else {
    next();
  }
});

export default router;
