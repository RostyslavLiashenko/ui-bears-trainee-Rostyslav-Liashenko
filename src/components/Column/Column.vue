<template>
  <v-card width="240" min-width="240" color="#699" class="mr-3 d-inline-block" style="height: fit-content;">
    <div class="title__container">
      <v-card-title class="text-sm-body-1 pb-0 text-break" style="cursor: pointer;" v-if="isTitleShow"
                    @click="isTitleShow = false">
        {{ column.title }}
      </v-card-title>
      <input class="title__container__input" v-focus v-else-if="!isTitleShow" v-model="title" type="text"
             @blur="addNewTitle"/>
    </div>
    <v-card-actions class="pt-0" v-if="!isCardFormShow">
      <v-btn :disabled="cardSpinner && getColumnIdSpinner === column.id" text class="text-md-body-2 text-lowercase" @click="isCardFormShow = true">
        Add card
        <v-icon size="x-small" class="ml-2" left>mdi-plus</v-icon>
      </v-btn>
      <v-btn color="error" class="ml-7" icon="mdi-delete" size="x-small" @click="deleteColumn"/>
    </v-card-actions>
    <CardForm v-else-if="isCardFormShow"
              :isCardFormShow="isCardFormShow"
              @onSubmitCard="onCreateCard"
              @closeCardForm="isCardFormShow = false"/>
    <div>
      <Cards v-if="myCards.length" :id="column.id" :title="column.title"/>
      <v-progress-circular
          v-if="cardSpinner && getColumnIdSpinner === column.id"
          indeterminate
          size="40"
          color="white"
          class="mt-1 mb-2" style="margin-left: 40% !important;"
      />
      <v-progress-circular
          v-if="AllCardsSpinner"
          indeterminate
          size="40"
          color="white"
          class="mt-1 mb-2" style="margin-left: 40% !important;"
      />
    </div>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Cards from './Cards/Cards'
import CardForm from './Cards/CardForm'
import {getCardsByColumnId} from "../../helpers/helpers";

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
  computed: mapGetters(["myCards", "cardSpinner", "getColumnIdSpinner", "AllCardsSpinner"]),
  methods: {
    ...mapActions(["removeColumn", "updateColumnTitle", "createCard", "removeCardFromCol", "updateOrderCol"]),
    addNewTitle() {
      if (!this.title || this.title.length > 20) return;
      this.updateColumnTitle({title: this.title, id: this.column.id})
      this.isTitleShow = true
    },
    deleteColumn() {
      let isDelete = confirm("Are you sure ?")
      if (isDelete) {
        this.removeColumn(this.column.id)
        this.removeCardFromCol(this.column.id)
        this.updateOrderCol(this.column.orderCol)
      }
    },
    onCreateCard(cardTitle) {
      if (!cardTitle || cardTitle.length > 20) return null;
      this.createCard({
        cardTitle, columnId: this.column.id,
        orderCard: this.getCardsByColumnId(this.myCards, this.column.id).length ? this.getCardsByColumnId(this.myCards, this.column.id).length + 1 : 1
      })
      cardTitle = ''
      this.isCardFormShow = false
    },
    getCardsByColumnId,
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
  background: rgba(249, 255, 250, 0.88);
  color: #333;
  margin-bottom: 5px;
}
</style>