<template>
  <router-link
    :to="{ name: 'messages', params: { username: 'ok' } }"
    class="d-block"
  >
    <li class="d-flex align-items-center">
      <CenterImage square class="rounded-circle overflow-hidden w-md" />
      <div class="mx-3">
        <span>{{ name }}</span
        ><br />
        <span class="text-muted">{{ lastMessage }}</span>
      </div>
    </li>
  </router-link>
</template>

<script>
import CenterImage from "../atoms/CenterImage";
export default {
  name: "ContactRow",
  components: { CenterImage },
  props: {
    name: String,
    lastMessage: String
  }
};
</script>

<style>
.w-md {
  width: 48px;
}
</style>
