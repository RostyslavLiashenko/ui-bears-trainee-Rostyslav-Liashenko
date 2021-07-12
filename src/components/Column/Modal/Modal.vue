<template>
  <v-card class="modalWindow">
    <v-card-title v-if="isCardTitleShow" class="text-h5 grey lighten-2 modalTitle mb-2"
                  @click="isCardTitleShow = false">
      {{ card.newCard.cardTitle }}
    </v-card-title>
    <input class="inputTitle" v-focus v-else-if="!isCardTitleShow" v-model="modalTitle" type="text"
           @blur="addNewTitle"/>

    <template v-if="isDescriptionShow">
      <v-card-header>
        Card description:
      </v-card-header>
      <v-card-text class="text-break text-md-body-2 pt-1" max-width="200">
        {{ card.newCard.description }}
      </v-card-text>
      <v-container class="flex-row">
        <v-btn size="x-small" icon color="#699" @click="isDescriptionShow=false">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-container>
    </template>
    <DescriptionForm v-else-if="!isDescriptionShow" :desc="card.newCard.description"
                     @closeDescForm="isDescriptionShow=true"
                     @addDescription="addDescription"/>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" text @click="$emit('onModal')">
        close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DescriptionForm from './DescriptionForm'
import {mapMutations} from 'vuex'

export default {
  components: {
    DescriptionForm
  },
  name: "Modal",
  props: {
    card: Object
  },
  data() {
    return {
      isDescriptionShow: true,
      isCardTitleShow: true,
      modalTitle: this.card.newCard.cardTitle
    }
  },
  methods: {
    ...mapMutations(["addDesc", "updateCardTitle"]),
    addDescription(text) {
      if (text.length > 200) return alert("text is too large")
      this.addDesc({idColumn: this.card.id, idCard: this.card.newCard.id, desc: text})
      this.isDescriptionShow = true
    },
    addNewTitle() {
      if (!this.modalTitle || this.modalTitle.length > 20) return;
      this.updateCardTitle({idColumn: this.card.id, idCard: this.card.newCard.id, title: this.modalTitle})
      this.isCardTitleShow = true
    }
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.modalWindow {
  width: 400px;
  z-index: 10;
  position: fixed;
  left: 35%;
  top: 30%;
}

.modalTitle {
  background: rgba(243, 250, 250, 0.78) !important;
  border: 2px solid darkkhaki;
  cursor: pointer;
  font-size: 1.1em;
}

.inputTitle {
  font-size: 1.1em;
  margin: 10px 5px 10px 10px;
  padding: 6px;
  border: 2px solid red;
  width: 100%;
  max-width: 380px;
  border-radius: 5px;
}
</style>