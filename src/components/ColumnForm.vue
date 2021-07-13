<template>
  <Form @submit="onSubmit" class="form__column">
    <div>
      <Field v-focus name="columnTitle" type="text" :rules="validateForm"
             class="form__column__input" placeholder="type column title" v-model="title"/>
      <ErrorMessage class="form__column__error" name="columnTitle" />
      <div>
        <v-btn type="submit" flat color="#699" class="text-white mr-2 mt-2">
          Add new list
        </v-btn>
        <v-btn color="error" class="mt-2" icon="mdi-delete" size="x-small" @click.stop="$emit('hideColumn'); clearTitle()"/>
      </div>
    </div>
  </Form>
</template>


<script>
import {mapMutations} from "vuex";
import {Form, Field, ErrorMessage} from 'vee-validate'

export default {
  name: "Column",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      title: ''
    }
  },
  props: {
    isColumnShow: Boolean,
  },
  methods: {
    ...mapMutations(["createColumn"]),
    clearTitle() {
      this.title = ''
    },
    validateForm(value) {
      if (!value) {
        return 'This field is required';
      }
      if (value.length > 20) return 'Must include 20 symbols max'
      return true
    },
    onSubmit() {
      const newColumn = {
        title: this.title,
        id: new Date().getTime(),
        cards: []
      }
      this.createColumn(newColumn)
      this.title = ''
      this.$emit('hideColumn')
    },
    directives: {
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    },
  }
}
</script>

<style scoped>
.form__column {
  max-width: 230px;
  padding: 10px;
  background: rgba(230,235,228,0.78);
  border-radius: 10px;
}
.form__column__input {
  padding: 6px;
  border: 2px solid #699;
  border-radius: 5px;
}
.form__column__error {
  display: inline-block;
  margin-top: 8px;
  color: rgba(255,3,0,0.78);
  font-weight: 500;
}
</style>