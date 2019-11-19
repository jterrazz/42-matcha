<template>
  <div>
    {{ me }}
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
      name: "SettingsPage",
      computed: mapState({
          me: state => state.auth.me.infos
      }),
      mounted() {
          this.$store.dispatch("auth/fetchMeIfNeeded", true)
      }
  }
</script>
