<template>
  <div class="modal-wrapper">
    <v-card class="modal">
      <div class="modal__spinner" v-if="cardModalSpinner">
        <Spinner prop-size="40"/>
      </div>
      <v-card-title v-if="isCardTitleShow" class="text-h5 grey lighten-2 mb-2 modal__title"
                    @click="isCardTitleShow = false">
        {{ card.cardTitle }}
      </v-card-title>
      <input class="modal__input__title" v-focus v-else-if="!isCardTitleShow" v-model="modalTitle" type="text"
             @blur="addNewTitle" :disabled="cardModalSpinner"/>

      <template v-if="isDescriptionShow">
        <v-card-header>
          Card description:
        </v-card-header>
        <v-card-text class="text-break text-md-body-1 pt-1" max-width="200">
          {{ card.description }}
        </v-card-text>
        <v-container class="flex-row">
          <v-btn size="x-small" icon color="#699" @click="isDescriptionShow=false" :disabled="cardModalSpinner">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-container>
      </template>
      <DescriptionForm
          v-else-if="!isDescriptionShow"
          :desc="card.description"
          @closeDescForm="isDescriptionShow=true"
          @addDescription="addDescription"
      />

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('onModal')">
          close
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="overlay" @click="$emit('closeModal')"></div>
  </div>
</template>

<script>
import DescriptionForm from './DescriptionForm'
import {mapActions, mapGetters} from 'vuex'
import Spinner from "../../Spinner/Spinner";

export default {
  name: "Modal",
  components: {
    DescriptionForm, Spinner
  },
  data() {
    return {
      isDescriptionShow: true,
      isCardTitleShow: true,
      modalTitle: this.card.cardTitle,
    }
  },
  props: {
    card: Object
  },
  computed: mapGetters(['cardModalSpinner']),
  methods: {
    ...mapActions(["addDesc", "updateCardTitle"]),
    addDescription(text) {
      if (text.length > 200) return alert("text is too large")
      this.addDesc({id: this.card.id, description: text})
      this.isDescriptionShow = true
    },
    addNewTitle() {
      if (!this.modalTitle || this.modalTitle.length > 20) return;
      this.updateCardTitle({id: this.card.id, cardTitle: this.modalTitle})
      this.isCardTitleShow = true
    }
  },
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .7);
  z-index: 100;
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.modal {
  width: 400px;
  z-index: 5;
  min-height: 250px;
}

.modal__title {
  background: rgba(243, 250, 250, 0.78) !important;
  border: 2px solid darkkhaki;
  cursor: pointer;
  font-size: 1.1em;
}

.modal__input__title {
  font-size: 1.1em;
  margin: 10px 5px 10px 10px;
  padding: 6px;
  border: 2px solid red;
  width: 100%;
  max-width: 380px;
  border-radius: 5px;
}

.modal__spinner {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #666;
  opacity: 0.5;
  z-index: 2;
}

.v-progress-circular {
  top: 40%;
  left: 45%;
}
</style>