<template>
  <div>
    hoooooo
    {{ type }}{{ message }}
  </div>
</template>

<script>
export default {
  name: "NotificationRow",
  props: {
    type: String,
    message: String
  }
};
</script>
