<template>
  <v-btn :disabled="colSpinner"
         v-show="!isColumnShow" @click="$emit('showColumn')"
         class="text-xl-subtitle-2 btn_create" variant="outlined"
         color="white">
    add new column
  </v-btn>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ColumnBtn",
  props: {
    isColumnShow: Boolean
  },
  computed: mapGetters(['colSpinner'])
}
</script>

<style scoped>
.btn_create:hover {
  transition: .2s;
  background: rgba(243, 255, 250, 0.78);
  color: #333333 !important;
}
</style>