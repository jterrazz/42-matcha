import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

import "./_bootstrap.scss";
import "./forms.scss";
import "./buttons.scss";
import "./sizes.scss";
import "./texts.scss";

library.add(faTwitter, faFacebook, faLinkedin);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(BootstrapVue);
