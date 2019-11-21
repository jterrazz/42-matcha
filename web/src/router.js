import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Search from "./components/pages/Search";
import Profile from "./components/pages/User";
import Messages from "./components/pages/Messages";
import Settings from "./components/pages/Settings";

Vue.use(VueRouter);

// TODO Add redirection if not logged to page
const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/login", component: Login, name: "login", meta: { authPage: true } },
  { path: "/register", component: Register, name: "register", meta: { authPage: true } },
  { path: "/discover", component: Search, name: "discover" },
  { path: "/search", component: Search, name: "search" },
  { path: "/users/:username", component: Profile, name: "user" },
  { path: "/messages", component: Messages, name: "messages" },
  { path: "/messages/:username", component: Messages, name: "message" },
  { path: "/settings", component: Settings, name: "settings" }
];

const router = new VueRouter({ routes, mode: "history" });

router.beforeEach((to, from, next) => {
  const loggedIn = true
  if (!to.matched.some(record => record.meta.authPage)) {
    if (!loggedIn) {
      return next({
        name: "login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    if (loggedIn) {
      next({ name: "home" });
    }
  }
  // TODO Else check we are not logged + in auth page
  next();
})

export default router;
