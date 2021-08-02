<template>
  <v-progress-circular
      indeterminate
      :size="propSize"
      color="white"
      :class="propClass"
      :style="propStyle"
  />
</template>

<script>
export default {
  name: "Spinner",
  props: ['propSize', 'propClass', 'propStyle']
}
</script>