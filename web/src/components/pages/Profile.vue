<template>
  <div>
    {{ user }}
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import * as _ from 'lodash'

  export default {
      name: "ProfilePage",
      data: () => ({
          user: null
      }),
      computed: {
          ...mapState(["auth"]),
          isMe: function() {
              return _.get(this, "user.username", false) === _.get(this, "auth.me.infos.username", true)
          }
      },
      methods: {
          ...mapActions(["auth/fetchMeIfNeeded"]),
          getUser() {
              this.$matchaAPI.getUser(this.$route.params.username)
                  .then(({ data: user }) => this.user = user)
                  .catch(err => console.error(err))
          },
      },
      mounted() {
          this["auth/fetchMeIfNeeded"](true);
          this.getUser()
      }
  }
</script>
