<template>
  <v-app>
    <Header/>
    <v-main class="mainBox">
      <div class="formContainer">
        <ColumnBtn :isColumnShow="isColumnShow" @showColumn="showColumn"/>
        <ColumnForm v-click-outside="hideColumn" v-if="isColumnShow" :isColumnShow="isColumnShow" @hideColumn="hideColumn"/>
      </div>
      <Columns />
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import Header from './components/Header'
import ColumnForm from "./components/ColumnForm";
import ColumnBtn from "./components/ColumnBtn";
import Columns from './components/Column/Columns'

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
}
</script>

<style>
html {
  overflow-y: auto;
}
.formContainer {
  margin-bottom: 30px;
}
.mainBox {
  padding: 30px 0 10px 20px !important;
  background: url("assets/pexels-pok-rie-132037.jpg") no-repeat;
  background-size: cover;
  margin-bottom: 40px;
}
</style>
