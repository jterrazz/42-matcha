<template>
  <b-container>
    <b-row>
      <b-col cols="9">
        {{ results }}

      </b-col>
      <b-col cols="3">
        <SearchOptions />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SearchOptions from "../molecules/SearchOptions";
export default {
  name: "SearchPage",
    components: {SearchOptions},
    data: () => ({
    results: null
  }),
  mounted() {
    this.$matchaAPI
      .search(this.params)
      .then(({ data: res }) => (this.results = res))
      .catch(console.error);
  }
};
</script>

<style>
</style>
