import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles";
import matchaAPI from "./services/matcha-api";
// import matchaSocket from "./services/matcha-socket";

Vue.prototype.$matchaAPI = matchaAPI;
// Vue.prototype.$matchaSocket = matchaSocket;

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
