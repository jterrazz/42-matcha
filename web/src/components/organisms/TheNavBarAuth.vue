<template>
  <b-navbar
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
</template>

<script>
  export default {
      name: "TheNavBarAuth",

  }
</script>
