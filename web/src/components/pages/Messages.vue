<template>
  <b-container class="p-5">
    <b-row>
      <b-col md="3">
        <ContactsList></ContactsList>
      </b-col>
      <b-col md="9" class="bg-white rounded shadow-sm">
        <h2 class="mt-3">Jean-Baptiste</h2>
        <p class="text-muted">Last message 2 years ago</p>

        <div class="dropdown-divider" />

        <div class="d-flex flex-column py-2">
          <MessageBubble
            v-for="m in messages"
            :message="m.text"
            :me="me.id === m.userId"
          />
        </div>

        <MessageInput class="w-100 mb-1" @new-message="appendMessage" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
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
    messages: [
      {
        text: "Hello",
        userId: 0
      },
      {
        text: "Yo",
        userId: 1
      },
      {
        text: "Hey",
        userId: 1
      }
    ],
    me: {
      id: 1
    }
  }),
  methods: {
    appendMessage: function(msg) {
      this.messages.push({ text: msg, userId: this.me.id });
    }
  }
};
</script>
