import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/index";
import store from "./store/index";

Vue.config.productionTip = false;

import Nav from "../src/components/Nav.vue";
Vue.component("Nav", Nav);
//注册全局组件Nav底部导航，谁用谁引入
import Layout from "@/components/Layout.vue";
Vue.component("Layout", Layout);
//注册全局组件Layout固定底部样式插槽，谁用谁引入
import Icon from "@/components/Icon.vue";
Vue.component("Icon", Icon);
//注册全局组件Icon,svg矢量图标，谁用谁引入

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
