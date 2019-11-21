<template>
  <b-container class="px-lg-5 py-lg-4">
    <b-row>
      <b-col md="3">
        <MePreview v-bind="me.infos" />
        <ContactsList :contacts="me.contacts" class="mt-4" />
      </b-col>

      <b-col md="9">
        <h1>Welcome back {{ me.infos.firstName }}!</h1>
        Find bellow what happened with your profile 😎

        <router-link :to="{ name: 'discover' }">
          <div
            class="rounded gd-m p-3 text-center text-white font-weight-bolder"
          >
            Or discover new people
          </div>
        </router-link>

        <h2 class="mt-3 mb-2 title">They liked me</h2>
        <user-carousel :users="me.likedBy" />

        <h2 class="mt-3 mb-2 title">They saw my profile</h2>
        <user-carousel :users="me.seenBy" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

import MePreview from "../molecules/MePreview";
import ContactsList from "../organisms/ContactList";
import UserCarousel from "../organisms/UserCarousel";

export default {
  name: "HomePage",
  components: {
    UserCarousel,
    MePreview,
    ContactsList
  },
  computed: mapState({
    me: state => state.auth.me
  }),
  mounted() {
    this.$store.dispatch("auth/fetchMeIfNeeded");
    this.$store.dispatch("auth/fetchMyInteractions");
    this.$store.dispatch("auth/fetchMyContacts");
  }
};
</script>
