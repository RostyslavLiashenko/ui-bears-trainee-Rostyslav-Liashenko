<template>
  <v-footer dark padless fixed bottom max-height="40px" width="100%" style="background: #699;" class="justify-center">
    <v-card class="flex" flat tile>
      <v-card-title class="teal pa-0" style="background: #699;">
        <span class="text-white text-md-subtitle-1">{{ new Date().getFullYear() }} — Trello application</span>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
}
</script>