<template>
  <draggable
      :disabled="cardSpinner"
      ghost-class="ghost__card"
      v-model="cards"
      group="cards_trello"
      @start="drag=true"
      @end="drag=false"
      item-key="id"
      @change="onChange($event, id)"
  >
    <template #item="{element}">
      <Card :card="element"/>
    </template>
  </draggable>
</template>

<script>
import Card from './Card'
import {mapActions, mapGetters} from 'vuex'
import draggable from 'vuedraggable'
import {getCardsByColumnId} from "../../../helpers/helpers";


export default {
  name: "Cards",
  components: {
    Card, draggable
  },
  props: {
    id: String,
    title: String
  },
  data() {
    return {
      drag: false,
      cards: [],
    }
  },
  watch: {
    async myCards() {
      this.cards = await this.getCardsByColumnId(this.myCards, this.id)
    }
  },
  computed: {
    ...mapGetters(["myCards", "cardSpinner"]),
  },
  mounted() {
    this.cards = this.getCardsByColumnId(this.myCards, this.id)
  },
  methods: {
    ...mapActions(["changeCardOrder", "addCardToAnotherCol", "changeCardOrderInCol"]),
    getCardsByColumnId,
    onChange(e, id) {
      if (e.moved) {
        this.changeCardOrder(e.moved)
      }
      if (e.added) {
        setTimeout(() => {
          this.addCardToAnotherCol({e: e.added, columnId: id})
        }, 200)
      }
      if (e.removed) {
        this.changeCardOrderInCol(e.removed)
      }
    },
  }
}
</script>
<style scoped>
.ghost__card {
  transform: scale(1.05) !important;
}
</style>