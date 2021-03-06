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
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线，$bus就是当前应用的vm
  },
  render: (h) => h(App),
}).$mount("#app");

// if (document.documentElement.clientWidth > 500) {
//   window.alert("请使用手机打开本页面，以保证浏览效果");
//   const img = document.createElement("img");
//   img.src = "./assets/qrcode.png";
//   img.style.position = "fixed";
//   img.style.left = "50%";
//   img.style.top = "50%";
//   img.style.transform = "translate(-50%,-50%)";
//   img.style.boxShadow = "0 0 10px rgba(0,0,0,0.25)";
//   document.body.appendChild(img);
// }
