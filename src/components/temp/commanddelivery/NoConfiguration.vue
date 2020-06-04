<template>
  <v-card flat style="width: 100%;">
    <v-card-text
      class="padded-message subheading"
    >This command destination has no configurable attributes.</v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VCard, VCardText } from "vuetify/lib";

@Component({ components: { VCard, VCardText } })
export default class NoConfiguration extends Vue {}
</script>

<style scoped>
.padded-message {
  padding: 50px;
  padding-top: 35px;
  text-align: center;
}
</style>
