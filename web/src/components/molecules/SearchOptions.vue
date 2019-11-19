<template>
  <div class="search-options bg-white border">
    <h3>Sort by</h3>
    <h3>Filters</h3>
    <h4>Age</h4>
    <VueSlider v-model="options.filters.age" :min="18" :max="99" enable-cross="false"/>
    <h4>Distance</h4>
    <VueSlider v-model="options.filters.age" :min="18" :max="99" enable-cross="false"/>
    <h4>Popularity</h4>
    <VueSlider v-model="options.filters.age" :min="18" :max="99" enable-cross="false"/>
    <h4>Tags</h4>
    <b-button>Reset</b-button>
  </div>
</template>

<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'

  export default {
      name: "SearchOptions",
      components: {
          VueSlider
      },
      data: () => ({
          options: {
              sortBy: null,
              filters: {
                  age: [18, 99],
                  minAge: null,
                  maxAge: null,
                  minPopularity: null,
                  maxPopularity: null,
                  minDistance: null,
                  maxDistance: null,
                  tags: ["dev", "trips"]
              }
          }
      })
  }
</script>

<style>
  .search-options {
    /*max-width: 300px;*/
  }
</style>
