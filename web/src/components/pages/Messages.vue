<template>
  <b-container class="p-5">
    <b-row>
      <b-col md="3">
        <ContactsList :contacts="contacts"></ContactsList>
      </b-col>
      <b-col md="9" class="bg-white rounded shadow-sm">
        <h2 class="mt-3">Jean-Baptiste</h2>
        <p class="text-muted">Last message 2 years ago</p>

        <div class="dropdown-divider" />

        <div class="d-flex flex-column py-2">
          <MessageBubble
            v-for="m in messages"
            :message="m.text"
            :me="me.infos.userId === m.userId"
          />
        </div>

        <MessageInput class="w-100 mb-1" @new-message="sendMessage" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

import ContactsList from "../organisms/ContactsList";
import MessageBubble from "../atoms/MessageBubble";
import MessageInput from "../molecules/MessageInput";

export default {
  name: "MessagesPage",
  components: {
    MessageInput,
    MessageBubble,
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
    this.$matchaAPI
      .getMyContacts()
      .then(({ data }) => (this.contacts = data.contacts))
      .catch(console.error);
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
