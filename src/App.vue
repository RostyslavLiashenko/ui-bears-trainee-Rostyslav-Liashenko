<template>
  <v-app>
    <Header/>
    <v-main class="main">
      <v-container class="mb-2 ml-0">
        <ColumnBtn :isColumnShow="isColumnShow" @showColumn="showColumn"/>
        <ColumnForm v-click-outside="hideColumn"
                    v-if="isColumnShow"
                    :isColumnShow="isColumnShow"
                    @hideColumn="hideColumn"/>
      </v-container>
      <v-container class="pb-3 mr-0 ml-0 d-flex">
        <Columns/>
        <v-progress-circular
            v-if="colSpinner"
            indeterminate
            size="50"
            color="white"
            class="ml-3 mt-6"
        />
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from "./components/Footer"
import Header from './components/Header'
import ColumnForm from "./components/ColumnForm"
import ColumnBtn from "./components/ColumnBtn"
import Columns from './components/Column/Columns'
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    ColumnForm,
    ColumnBtn,
    Columns
  },
  data() {
    return {
      isColumnShow: false,
    }
  },
  methods: {
    showColumn() {
      this.isColumnShow = true
    },
    hideColumn() {
      this.isColumnShow = false
    }
  },
  computed: mapGetters(['colSpinner'])
}
</script>

<style>
html {
  overflow-y: auto;
}

.main {
  padding: 30px 0 10px 20px !important;
  background: url("assets/pexels-pok-rie-132037.jpg") no-repeat;
  background-size: cover;
  margin-bottom: 40px;
  overflow-x: auto;
}
</style>
