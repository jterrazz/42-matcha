<template>
  <div v-if="user">
    <div class="bg-white">
    <b-container>
      <b-button @click="editMode = !editMode">Edit</b-button>
      <CenterImage :src="user.images[0]" class="rounded-circle overflow-hidden" style="width: 200px;" square />
      <h1>{{ user.firstName }} {{ user.lastName }}</h1>
      <p>{{ user.gender }}, {{ user.age }} yo</p>
      <p>{{ user.biography }}</p>

      <div>Fame rating</div>
      <div>Sexual pref</div>
      <div>Localisation</div>
      <div>Tags</div>
      <h2>Images</h2>

      <div v-if="editMode">
        <input placeholder="First Name">
      </div>
    </b-container>
    </div>

    <b-container>
    <CenterImage v-for="i in user.images" :key="i" :src="i" />
    </b-container>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import * as _ from 'lodash'
  import CenterImage from "../atoms/CenterImage";

  export default {
      name: "UserPage",
      components: {CenterImage},
      data: () => ({
          user: null,
          editMode: false
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
          this["auth/fetchMeIfNeeded"]();
          this.getUser()
      }
  }
</script>
