<template>
  <li class="profile-preview-cell bg-white rounded overflow-hidden border">
    <router-link :to="{ name: 'user', params: { username: user.username } }">
      <CenterImage square />
    </router-link>

    <div class="p-4">
      <b-row>
        <b-col>
          <h3 class="text-lg font-weight-bold">{{ user.firstName }}</h3>
          <div class="text-lg text-muted card-subtitle">
            {{ user.gender }}, {{ user.age }}yo
          </div>
        </b-col>
        <b-col class="text-right">
          S.
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col cols="6">
          <div class="text-muted text-sm">Popularity</div>
          <div>{{ user.fameRating }} 4242</div>
        </b-col>
        <b-col cols="6">
          <div class="text-muted text-sm">Distance</div>
          <div>{{ user.distance }} 42km</div>
        </b-col>
      </b-row>

      <div class="text-muted text-sm">Tags</div>

      <div v-if="user.interests.length">
        <div v-for="tag in user.interests" :key="tag" class="tag mt-2">
          {{ tag }}
        </div>
      </div>

      <div v-else class="text-muted text-sm">No tags yet</div>

      <div class="d-flex pt-4">
        <b-button class="font-weight-bold rounded-max flex-1 mr-3" @click="likeUser">
          like
        </b-button>
        <b-button
          variant="muted"
          class="font-weight-bold rounded-max flex-1"
          :to="{ name: 'user', params: { username: user.username } }"
        >
          profile
        </b-button>
      </div>
    </div>
  </li>
</template>

<script>
import CenterImage from "../atoms/CenterImage";

export default {
  name: "UserPreview",
  components: { CenterImage },
  props: {
    user: Object
  },
    methods: {
      likeUser() {
          this.$matchaAPI.likeUser(this.user.username).then(() => {

          })
      }
    }
};
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

.profile-preview-cell {
  display: block;
}
.tag {
  display: inline-block;
  background: $muted-bg;
  border-radius: 3px;
  padding: 2px 6px;
  margin-right: 6px;
  font-size: 0.9em;
  color: $muted;
}
</style>
