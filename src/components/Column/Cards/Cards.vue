<template>
  <div v-for="card in cards" :key="card.id">
    <Card :card="card" />
  </div>
</template>

<script>
import Card from "./Card";
export default {
  components: {
    Card
  },
  name: "Cards",
  props: {
    cards: Array
  }
}
</script>

<style scoped>

</style>