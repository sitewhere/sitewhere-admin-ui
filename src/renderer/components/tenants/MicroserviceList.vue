<template>
  <v-list v-if="microservices" two-line dense>
    <template v-for="microservice in microservices">
      <v-list-tile :key="microservice.id" @click="onMicroserviceClicked(microservice)">
        <v-list-tile-avatar>
          <v-icon>{{ microservice.icon }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="microservice.name" />
          <v-list-tile-sub-title v-html="microservice.description" />
        </v-list-tile-content>
      </v-list-tile>
      <v-divider :key="'div-' + microservice.id" />
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { IMicroserviceSummary } from "sitewhere-rest-api";

@Component({
  components: {}
})
export default class MicroserviceList extends Vue {
  @Prop() readonly microservices!: IMicroserviceSummary[];

  /** Called when a microservice is clicked */
  onMicroserviceClicked(microservice: IMicroserviceSummary) {
    this.$emit("microserviceClicked", microservice);
  }
}
</script>

<style></style>
