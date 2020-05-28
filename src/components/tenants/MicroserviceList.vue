<template>
  <v-list v-if="microservices" two-line dense>
    <template v-for="microservice in microservices">
      <v-list-item :key="microservice.id" @click="onMicroserviceClicked(microservice)">
        <v-list-item-avatar>
          <v-icon>{{ microservice.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="microservice.name" />
          <v-list-item-subtitle v-html="microservice.description" />
        </v-list-item-content>
      </v-list-item>
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
