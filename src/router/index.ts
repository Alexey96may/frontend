import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CatalogView from "../views/CatalogView.vue";
import CardView from "../views/CardView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import AuthorizationView from "../views/AuthorizationView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Главная страница",
    component: HomeView,
  },
  {
    path: "/catalog",
    name: "Коллекция",
    component: CatalogView,
  },
  {
    path: "/catalog/:id",
    name: "card",
    component: CardView,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: AuthorizationView,
  },
  {
    path: "/about",
    name: "О нас",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
