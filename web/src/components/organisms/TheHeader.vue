<template>
  <header>
    <TheNavBarAuth v-if="isAuthPage" />
    <TheNavBar v-else />
  </header>
</template>

<script>
    import TheNavBar from "./TheNavBar";
    import TheNavBarAuth from "./TheNavBarAuth";

    export default {
        name: "TheHeader",
        components: {
            TheNavBarAuth,
            TheNavBar
        },
        computed: {
            isAuthPage () {
                return ["login", "register"].indexOf(this.$route.name) >= 0
            }
        }
    };
</script>
