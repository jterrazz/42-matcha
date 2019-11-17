<template>
  <li class="profile-preview-cell bg-white rounded overflow-hidden shadow-sm">
    <router-link :to="{ name: 'profile', params: { username: 'jterrazz' } }">
      <CenterImage square />
    </router-link>

    <div class="p-3">
      <h3>{{ user.firstName }}</h3>
      <p>Likes</p>
      <p>sex orientation</p>
      <p>Gender</p>

      TAGSSSS
      <div class="dropdown-divider" />
      <div class="d-flex justify-content-between">
        <span class="mr-2 text-muted">Age</span>
        <span>{{ user.age }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span class="mr-2 text-muted">Distance</span>
        <span>{{ user.distance }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import CenterImage from "../atoms/CenterImage";

export default {
  name: "ProfilePreview",
  components: { CenterImage },
  props: {
    user: {
      type: Object,
      default: { firstName: "yo", age: "18yo", distance: "3km" }
    }
  }
};
</script>

<style>
.profile-preview-cell {
  display: block;
}
</style>
