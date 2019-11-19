import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Search from "./components/pages/Search";
import Find from "./components/pages/Find";
import Profile from "./components/pages/Profile";
import Messages from "./components/pages/Messages";
import Settings from "./components/pages/Settings";

Vue.use(VueRouter);

// TODO Add redirection if not logged to page
const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  { path: "/discover", component: Search, name: "discover" },
  { path: "/search", component: Search, name: "search" },
  { path: "/find", component: Find, name: "find" },
  { path: "/users/:username", component: Profile, name: "profile" },
  { path: "/messages", component: Messages, name: "messages" },
  { path: "/messages/:username", component: Messages, name: "message" },
  { path: "/settings", component: Settings, name: "settings" }
];

export default new VueRouter({ routes, mode: "history" });
