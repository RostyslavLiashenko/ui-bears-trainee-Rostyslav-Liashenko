<template>
  <div v-for="card in cards" :key="card.id">
    <Card :card="card" />
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "Cards",
  components: {
    Card
  },
  props: {
    cards: Array
  }
}
</script>