<template>
  <Form @submit="$emit('addDescription', description)" class="form">
    <textarea v-focus name="cardTitle" class="input" placeholder="type your description" v-model="description"/>
    <v-btn text class="text-md-body-2 text-white pr-2 text-lowercase mr-5 mt-2 pl-2 btnSave" type="submit"
           color="success">
      save description
    </v-btn>
    <v-btn icon="mdi-close" color="error" variant="outlined" size="x-small" class="mt-2 btnClose"
           @click="$emit('closeDescForm')"/>
  </Form>
</template>

<script>
import {Form} from 'vee-validate'

export default {
  components: {
    Form
  },
  props: {
    desc: String
  },
  name: "DescriptionForm",
  data() {
    return {
      description: this.desc
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
.input {
  padding: 6px;
  border: 2px solid #699;
  border-radius: 5px;
  color: #333;
  grid-area: input;
  resize: none;
  font-size: .9em;
}

.btnSave {
  grid-area: btnSave;
}

.btnClose {
  grid-area: btnClose;
}

.form {
  padding: 2px 5px 5px 10px;
  display: grid;
  grid-template-rows: 50px 60px;
  grid-template-columns: 170px 100px;
  grid-template-areas: "input input"
                  "btnSave btnClose";
}

</style>