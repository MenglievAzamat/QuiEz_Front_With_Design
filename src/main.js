import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import title from "./components/SiteTitle";
import "./assets/css/global.scss";
import "./assets/js/rubber.js";

Vue.config.productionTip = false;

Vue.component("site-title", title);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
