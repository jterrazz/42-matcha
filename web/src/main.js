import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles";
import matchaAPI from "./services/matcha-api";

Vue.prototype.$matchaAPI = matchaAPI;

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
