<template>
  <v-btn v-show="!isColumnShow" @click="$emit('showColumn')" class="text-xl-subtitle-2 btn" variant="outlined" color="white">
    add new column
  </v-btn>
</template>

<script>
export default {
  name: "ColumnBtn",
  props: {
    isColumnShow: Boolean
  }
}
</script>

<style scoped>
.btn:hover {
  transition: .2s;
  background: rgba(243,255,250,0.78);
  color: #333333 !important;
}
</style>