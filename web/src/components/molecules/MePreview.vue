<template>
  <section class="bg-white overflow-hidden rounded border">
    <CenterImage :src="images[0]" square>
      <Like :amount="nbLikes" class="position-absolute" style="bottom: 10px; right: 10px;" />
    </CenterImage>

    <div class="p-3 bg-white border-top">
      <h4>{{ firstName }} {{ lastName }}</h4>
      <p>{{ biography }}</p>

      <div class="text-right text-muted">
        <router-link :to="{ name: 'user', params: { username } }">My profile</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import CenterImage from "../atoms/CenterImage";
import Like from "../atoms/Like";

export default {
  name: "MePreview",
  components: { Like, CenterImage },
  props: {
    firstName: String,
    lastName: String,
    biography: String,
    images: Array,
    username: String,
      nbLikes: Number
  }
};
</script>
