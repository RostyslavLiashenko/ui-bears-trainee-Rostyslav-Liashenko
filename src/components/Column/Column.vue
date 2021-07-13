<template>
  <v-card width="240" min-width="240" color="#699" class="mr-3 d-inline-block" style="height: fit-content;">
    <div class="title__container">
      <v-card-title class="text-md-body-1 pb-0 text-break" style="cursor: pointer;" v-if="isTitleShow" @click="isTitleShow = false">
        {{ column.title }}
      </v-card-title>
      <input class="title__container__input" v-focus v-else-if="!isTitleShow" v-model="title" type="text" @blur="addNewTitle"/>
    </div>
    <v-card-actions class="pt-0" v-if="!isCardFormShow">
      <v-btn text class="text-md-body-2 text-lowercase" @click="isCardFormShow = true">
        Add card
        <v-icon size="x-small" class="ml-2" left>mdi-plus</v-icon>
      </v-btn>
      <v-btn color="error" class="ml-7" icon="mdi-delete" size="x-small" @click="deleteColumn"/>
    </v-card-actions>
    <CardForm v-else-if="isCardFormShow"
              :isCardFormShow="isCardFormShow"
              @onSubmitCard="onSubmitCard"
              @closeCardForm="isCardFormShow = false"/>
    <Cards :cards="column.cards"/>
  </v-card>
</template>

<script>
import {mapMutations} from 'vuex'
import Cards from './Cards/Cards'
import CardForm from './Cards/CardForm'

export default {
  name: "Column",
  components: {
    Cards,
    CardForm
  },
  data() {
    return {
      isTitleShow: true,
      isCardFormShow: false,
      title: this.column.title
    }
  },
  props: {
    column: Object
  },
  methods: {
    ...mapMutations(["updateTitle", "removeColumn", "createCard"]),
    addNewTitle() {
      if (!this.title || this.title.length > 20) return;
      this.updateTitle({title: this.title, id: this.column.id})
      this.isTitleShow = true
    },
    deleteColumn() {
      let isDelete = confirm("Are you sure ?")
      if (isDelete) this.removeColumn(this.column.id)
    },
    onSubmitCard(cardTitle1) {
      if (!cardTitle1 || cardTitle1.length > 20) return null;
      const newCard = {
        cardTitle: cardTitle1,
        id: new Date().getTime()
      }
      this.createCard({newCard: newCard, id: this.column.id})
      cardTitle1 = ''
      this.isCardFormShow = false
    },
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
}
</script>

<style scoped>
.title__container__input {
  margin: 5px 5px 1px 5px;
  padding: 6px;
  border: 2px solid red;
  border-radius: 5px;
}
.title__container {
  border: 2px solid darkkhaki;
  border-radius: 5px 5px 0 0;
  background: rgba(249,255,250,0.88);
  color: #333;
  margin-bottom: 5px;
}
</style>