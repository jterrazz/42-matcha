<template>
  <div id="app">
    <header>
      <b-navbar
        v-if="isAuthPage"
        :key="$route.fullPath"
        fixed="top"
        toggleable="lg"
        variant="transparent"
        class="d-none d-md-flex"
      >
        <b-navbar-brand :to="{ name: 'home' }">Matcha</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            v-if="$route.name !== 'login'"
            :to="{ name: 'login' }"
            class="button__rounded--transparent button--white px-4"
            >Login</b-nav-item
          >
          <b-nav-item
            v-if="$route.name !== 'register'"
            :to="{ name: 'register' }"
            class="button__rounded--transparent button--white px-4"
            >Register</b-nav-item
          >
        </b-navbar-nav>
      </b-navbar>

      <b-navbar
        v-else
        fixed="top"
        variant="white"
        class="shadow-sm"
        toggleable="lg"
      >
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-brand :to="{ name: 'home' }">Matcha</b-navbar-brand>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
            <b-nav-item :to="{ name: 'discover' }">Discover</b-nav-item>
            <b-nav-item :to="{ name: 'me' }">My Profile</b-nav-item>
            <b-nav-item :to="{ name: 'messages' }">Messages</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <img src="./assets/bell.svg" alt="disconnect" height="20" />
            </b-nav-item>

            <b-nav-item-dropdown right>
              <NotificationRow />
            </b-nav-item-dropdown>
            <b-nav-item>
              <img src="./assets/power.svg" alt="disconnect" height="20" />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>

    <main :class="{ 'nav-padding': !isAuthPage }">
      <router-view class="router-view" />
    </main>

    <footer v-if="isAuthPage" class="text-right fixed-bottom">
      <p>Credits - frontend @jterrazz - backend @abbensid</p>
      <p>42</p>
    </footer>
    <footer v-else class="bg-white">
      <p>Credits - frontend @jterrazz - backend @abbensid</p>
      <p>42</p>
    </footer>
  </div>
</template>

<script>
import NotificationRow from "./components/molecules/NotificationRow";
export default {
  name: "App",
  components: { NotificationRow },
  data: function() {
    return {
      isAuthPage: ["login", "register"].indexOf(this.$route.name) >= 0
    };
  }
};
</script>

<style lang="scss">
@import "styles/_variables.scss";

body,
html {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  background-color: $background;
}
.nav-padding {
  padding-top: 56px;
}
</style>
