<template>
  <b-container>
    <b-row>
      <b-col cols="9">
        <UserPreview v-for="u in results" :key="u.id" :user="u" class="w-33 float-left" />
      </b-col>
      <b-col cols="3">
        <SearchOptions />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SearchOptions from "../organisms/SearchOptions";
import UserPreview from "../molecules/UserPreview";

export default {
  name: "SearchPage",
    components: {UserPreview, SearchOptions},
    data: () => ({
    results: null
  }),
  mounted() {
    this.$matchaAPI
      .search(this.params)
      .then(({ data }) => (this.results = data.results))
      .catch(console.error);
  }
};
</script>

<style>
</style>
