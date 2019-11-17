<template>
  <nav class="bg-white p-3 shadow-sm rounded">
    <div v-if="contacts.length">
      <h3 class="section-title">Contacts</h3>
      <div class="dropdown-divider" />
      <ContactRow
        v-for="c in contacts"
        :name="c.name"
        :last-message="c.lastMessage"
        class="mt-3"
      ></ContactRow>
    </div>
    <div v-else class="text-muted">
      No contacts yet
    </div>
  </nav>
</template>

<script>
import ContactRow from "../molecules/ContactRow";

export default {
  name: "ContactsList",
  components: {
    ContactRow
  },
  props: {
    contacts: { type: Array, default: [] }
  }
};
</script>
