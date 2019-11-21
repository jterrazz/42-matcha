<template>
  <li :class="{ me }" class="p-2 px-3 mb-1">
    {{ message }}
  </li>
</template>

<script>
export default {
  name: "TextBubble",
  props: {
    message: String,
    me: Boolean
  }
};
</script>

<style lang="scss" scoped>
li {
  display: block;
  border-radius: 30px;
  background: #eee;
  align-self: start;
}
.me {
  background: #0084ff;
  color: #fff;
  border-bottom-right-radius: 5px;
  align-self: flex-end;
}
li:not(.me) {
  border-bottom-left-radius: 5px;
}
</style>
