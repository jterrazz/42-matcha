<template>
  <div class="d-flex">
    <input
      v-model="message"
      style="flex: 1;"
      class="mr-1 message-input rounded-max px-2"
      placeholder="New message"
      @keyup.enter="newMessage()"
    />
    <b-button class="rounded-max" @click="newMessage()">Send</b-button>
  </div>
</template>

<script>
export default {
  name: "MessageInput",
  data: () => ({
    message: ""
  }),
  methods: {
    newMessage: function() {
      this.$emit("new-message", this.message);
      this.message = "";
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/_variables";

.message-input {
  border: 1px solid $border;
}
</style>
