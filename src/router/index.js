import Vue from "vue";
import VueRouter from "vue-router";
import TodoContainer from "../views/Todo.vue";
import About from "../views/About.vue";
import goto from "vuetify/es5/services/goto";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Todo",
    component: TodoContainer,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
  next();
});
router.afterEach((to, from) => {
  goto(0, { duration: 0 });
});

export default router;
