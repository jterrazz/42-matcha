<template>
  <div class="position-relative">
    <div v-if="count" class="badge position-absolute" :style="style">
      {{ count }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Badge",
  props: {
      count: Number,
      padding: Number
  },
    computed: {
      style: function() {
          return {
              top: -this.padding + "px",
              right: -this.padding + "px"
          }
      }
    }
}
</script>

<style>
  .badge {
    background: #f73859;
    color: white;
    font-size: 0.81rem !important;
    padding: 4px !important;
  }
</style>
