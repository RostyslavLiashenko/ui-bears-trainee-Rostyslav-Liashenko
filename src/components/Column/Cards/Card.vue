<template>
  <div style="display: flex; align-items: center">
    <v-btn class="mt-1 mr-1 mb-1 ml-1 text-lowercase text-sm-body-1 card__btn" @click="modal=true">
      {{card.cardTitle}}
    </v-btn>
    <v-btn icon="mdi-close" @click="deleteCard" color="white" variant="outlined" size="x-small" class="card__btn_delete"/>
    <Modal v-if="modal" @onModal="modalClose" v-click-outside="modalClose" :card="card"/>
  </div>
</template>

<script>
import Modal from '../Modal/Modal'
import {mapActions} from 'vuex'
export default {
  name: "Card",
  components: {
    Modal
  },
  data() {
    return {
      modal: false
    }
  },
  props: {
    card: Object
  },
  methods: {
    ...mapActions(["removeCard"]),
    modalClose() {
      this.modal = false
    },
    deleteCard() {
      this.removeCard({columnId: this.card.columnId, id: this.card.id})
    }
  }
}
</script>

<style scoped>
.card__btn {
  width: 190px !important;
}
.card__btn_delete:hover {
  transition: .2s;
  color: red !important;
  background: #fff;
}
</style>