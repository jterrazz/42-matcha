<template>
  <div class="p-1 bg-white rounded-max">
    {{ amount }}
    <img src="../../assets/heart.svg" class="w-md" height="24" />
  </div>
</template>

<script>
export default {
  name: "Like",
  props: {
    liked: Boolean,
    amount: Number
  }
};
</script>
