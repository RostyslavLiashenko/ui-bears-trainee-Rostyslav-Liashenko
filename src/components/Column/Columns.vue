<template>
  <draggable
      drag-class="chosen"
      ghost-class="ghost"
      :disabled="colSpinner"
      class="d-flex"
      v-model="columns"
      group="columns_trello"
      @start="drag=true"
      @end="onDrag"
      item-key="id"
      tag="transition-group"
      :component-data="{name:'fade'}"
  >
    <template #item="{element}">
      <Column :column="element"/>
    </template>
  </draggable>
</template>
<script>
import Column from "./Column"
import {mapGetters, mapActions} from 'vuex'
import draggable from "vuedraggable";

export default {
  name: "Columns",
  components: {
    Column, draggable
  },
  data() {
    return {
      drag: false,
      columns: []
    }
  },
  watch: {
    allColumns() {
      this.columns = this.allColumns
    }
  },
  methods: {
    ...mapActions(["getAllColumns", "getAllCards", "changeColOrder"]),
    onDrag(e) {
      this.drag = false
      if (e.newIndex !== e.oldIndex) {
        this.changeColOrder(e)
      }
    }
  },
  computed: mapGetters(["allColumns", "myCards", "colSpinner"]),
  async mounted() {
    await this.getAllColumns()
    await this.getAllCards()
    this.columns = this.allColumns
  }
}
</script>

<style>
.chosen {
  background: rgba(88, 138, 138, 0.78) !important;
}
.ghost {
  transform: scale(1.03) !important;
}

.fade-enter-active {
  transition: all 0.4s ease-out;
}
.fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
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