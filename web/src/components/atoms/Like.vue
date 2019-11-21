<template>
  <div class="py-1 px-2 rounded-max bg-warning">
    {{ amount }}
    <img src="../../assets/heart.svg" height="20" />
  </div>
</template>

<script>
export default {
  name: "Like",
  props: {
    amount: Number
  }
};
</script>
