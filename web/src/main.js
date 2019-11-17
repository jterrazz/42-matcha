import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import routes from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faTwitter,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTwitter, faFacebook, faLinkedin);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import Vuex from "vuex";
// TODO Import all with one line
import "./styles/_bootstrap.scss";
import "./styles/forms.scss";
import "./styles/buttons.scss";
import "./styles/sizes.scss";
import "./styles/texts.scss";
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({ routes, mode: "history" });

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
