<template>
  <div id="app">
    <b-navbar fixed="top" toggleable="lg" variant="transparent" class="d-none d-md-flex">
      <b-navbar-brand to="/">Matcha</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="$route.name !== 'login'" to='/login' class="button__rounded--transparent button--white px-4">Login</b-nav-item>
            <b-nav-item v-if="$route.name !== 'register'" to='/register' class="button__rounded--transparent button--white px-4">Register</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <main class="h-100">
      <router-view class="router-view"/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
  body, html {
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
</style>
