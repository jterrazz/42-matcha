<template>
  <div class="position-relative">
    <div
      :class="{ square }"
      :style="
        'background-image: url(\'' +
          src +
          '\'); background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;'
      "
      style="left: 0; right: 0; bottom: 0; top: 0;"
    ></div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "CenterImage",
  props: {
    src: { type: String, default: "https://source.unsplash.com/random" },
    square: Boolean
  }
};
</script>

<style>
.square {
  padding-bottom: 100%;
}
</style>
