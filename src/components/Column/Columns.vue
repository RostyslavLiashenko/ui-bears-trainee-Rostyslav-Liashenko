<template>
  <div class="columns__container">
    <Column v-for="column in allColumns" :key="column.id" :column="column" />
  </div>
</template>
<script>
import Column from "./Column";
import {mapGetters} from 'vuex'
export default {
  name: "Columns",
  components: {
    Column
  },
  computed: mapGetters(["allColumns"]),
}
</script>

<style>
.columns__container {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;
}
::-webkit-scrollbar-thumb {
  background-color: #fff;
  border-radius: 9em;
  box-shadow: inset 1px 1px 10px #f3faf7;
}
::-webkit-scrollbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px; /* ширина для вертикального скролла */
  height: 8px; /* высота для горизонтального скролла */
  background-color: #699;
  border-radius: 9em;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #699;
}
</style>