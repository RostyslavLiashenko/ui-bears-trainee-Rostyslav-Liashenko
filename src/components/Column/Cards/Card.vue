<template>
  <div style="display: flex; align-items: center">
    <v-btn class="mt-1 mr-1 mb-1 ml-1 text-lowercase text-sm-body-1 btnCard" @click="modal=true">
      {{card.newCard.cardTitle}}
    </v-btn>
    <v-btn icon="mdi-close" @click="deleteCard" color="white" variant="outlined" size="x-small" class="btnDelete"/>
    <Modal v-if="modal" @onModal="modalClose" v-click-outside="modalClose" :card="card"/>
  </div>
</template>

<script>
import Modal from '../Modal/Modal'
import {mapMutations} from 'vuex'
export default {
  components: {
    Modal
  },
  data() {
    return {
      modal: false
    }
  },
  name: "Card",
  props: {
    card: Object
  },
  methods: {
    ...mapMutations(["removeCard"]),
    modalClose() {
      this.modal = false
    },
    deleteCard() {
      this.removeCard({idColumn: this.card.id, idCard: this.card.newCard.id})
    }
  }
}
</script>

<style scoped>
.btnCard {
  width: 190px !important;
}
.btnDelete:hover {
  transition: .2s;
  color: red !important;
  background: #fff;
}
</style>