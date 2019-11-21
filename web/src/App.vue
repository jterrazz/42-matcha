<template>
  <div id="app" class="d-flex flex-column">
    <TheHeader />
    <main :class="{ 'nav-spacing': !isAuthPage }" class="flex-1">
      <router-view class="router-view" />
    </main>
    <TheFooter :class="{ 'fixed-bottom bg-transparent': isAuthPage }" />
  </div>
</template>

<script>
import TheFooter from "./components/organisms/TheFooter";
import TheHeader from "./components/organisms/TheHeader";

export default {
  name: "App",
  components: { TheHeader, TheFooter },
  data: function() {
    return {
      isAuthPage: ["login", "register"].indexOf(this.$route.name) >= 0,
      gettingLocation: false,
        location: null,
        errorStr: null
    };
  },
    created() {
      // TODO Send position at app start
      navigator.geolocation.getCurrentPosition(pos => {
          this.gettingLocation = true;
          this.location = pos;
          console.log(pos)
      }, err => {
          this.errorStr = err.message;
      })
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
  font-size: 0.96em;
  font-weight: 500;
}
.nav-spacing {
  padding-top: 56px;
}
</style>
