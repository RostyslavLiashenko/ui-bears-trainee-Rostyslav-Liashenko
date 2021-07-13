<template>
  <Form @submit="addCard" class="form__card">
    <Field v-focus name="cardTitle" class="form__card__input" placeholder="type a title" v-model="cardTitle"/>
    <v-btn text class="text-md-body-2 text-lowercase mr-5 mt-2 pr-2" type="submit">
      new card
      <v-icon class="ml-2" size="x-small" left>mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon="mdi-close" size="x-small" class="mt-2" @click="$emit('closeCardForm')"/>
  </Form>
</template>

<script>
import {Form, Field} from 'vee-validate'

export default {
  name: "CardForm",
  components: {
    Form,
    Field,
  },
  data() {
    return {
      cardTitle: ''
    }
  },
  props: {
    isCardFormShow: Boolean
  },
  methods: {
    addCard() {
      this.$emit('onSubmitCard', this.cardTitle)
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
.form__card {
  padding: 2px 5px 5px 10px;
}
.form__card__input {
  padding: 6px;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
}
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #f3faf7;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #f3faf7;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #f3faf7;
}
:-moz-placeholder { /* Firefox 18- */
  color: #f3faf7;
}
</style>