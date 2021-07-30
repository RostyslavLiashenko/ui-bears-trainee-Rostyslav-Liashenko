<template>
  <v-card class="overflow-hidden">
    <v-app-bar absolute color="#699" shrink-on-scroll
               src="https://picsum.photos/1920/1080?random" scroll-target="#scrolling-techniques-2">
      <v-btn size="x-small" class="mx-2" variant="outlined" icon color="white">
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>
      <v-btn size="x-small" class="mx-2" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn size="x-small" class="mx-2" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-app-bar-title class="text-white trello__text">
        <v-icon class="home pb-sm-1">mdi-domain</v-icon>
        Trello
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn size="x-small" class="mx-2" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn size="x-small" class="mx-2" color="white" icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
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
  left: 37%;
  cursor: pointer;
}

.trello__text:hover {
  color: #333 !important;
}
</style>