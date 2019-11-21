<template>
  <div>
    <div><b>{{ type }}</b></div>
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "NotificationRow",
  props: {
    type: String,
      text: String
  }
};
</script>
