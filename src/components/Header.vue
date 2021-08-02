<template>
  <v-card class="overflow-hidden">
    <v-app-bar absolute color="#699" shrink-on-scroll
               src="https://picsum.photos/1920/1080?random" scroll-target="#scrolling-techniques-2">

      <v-app-bar-title class="text-white trello__text">
        <v-icon class="home pb-sm-1">mdi-domain</v-icon>
        Trello
      </v-app-bar-title>

      <v-spacer></v-spacer>

    </v-app-bar>
    <v-sheet id="scrolling-techniques-2" class="overflow-y-auto" max-height="50">
      <v-container style="height: 50px;"></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.trello__text {
  position: relative;
  left: 45%;
  cursor: pointer;
}

.trello__text:hover {
  color: #333 !important;
}
</style>