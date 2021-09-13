import Vue from "vue";
import VueRouter from "vue-router";
import Money from "../views/Money.vue";
import Labels from "@/views/Labels.vue";
import NotFound from "@/views/NotFound.vue";
// @后面直接跟文件目录可以省掉寻找路径过程
import Statistics from "@/views/Statistics.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/money",
    // 配置默认路径
  },
  {
    path: "/money",
    component: Money,
  },
  {
    path: "/labels",
    component: Labels,
  },
  {
    path: "/statistics",
    component: Statistics,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
