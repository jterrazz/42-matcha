<template>
  <b-container class="p-5">
    <b-row>
      <b-col md="3">
        <ContactsList :contacts="me.contacts"></ContactsList>
      </b-col>
      <b-col md="9" class="bg-white rounded border">
        <h2 class="mt-3">Jean-Baptiste</h2>
        <p class="text-muted">Last message 2 years ago</p>

        <div class="dropdown-divider" />

        <div class="d-flex flex-column py-2">
          <TextBubble
            v-for="m in messages"
            :key="m.id"
            :message="m.text"
            :me="me.infos.id === m.userId"
          />
        </div>

        <MessageInput class="w-100 mb-1" @new-message="sendMessage" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

import ContactsList from "../organisms/ContactList";
import TextBubble from "../atoms/TextBubble";
import MessageInput from "../molecules/MessageInput";

export default {
  name: "MessagesPage",
  components: {
    MessageInput,
    TextBubble,
    ContactsList
  },
  data: () => ({
    contacts: null,
    messages: null
  }),
  computed: mapState({
    me: state => state.auth.me
  }),
  mounted() {
    this.$store.dispatch("auth/fetchMeIfNeeded");
    this.$store.dispatch("auth/fetchMyContacts");
    this.$matchaAPI
      .getMessages(this.$route.params.username)
      .then(({ data }) => (this.messages = data.messages))
      .catch(console.error);
  },
  methods: {
    sendMessage: function(msg) {
      this.messages.push({ text: msg, userId: this.me.id });
    }
  }
};
</script>
