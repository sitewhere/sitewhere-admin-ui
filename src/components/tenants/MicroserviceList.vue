<template>
  <v-list class="pa-0" v-if="microservices" two-line dense>
    <template v-for="microservice in microservices">
      <v-divider :key="'div-' + microservice.id" />
      <v-list-item :key="microservice.id" @click="onMicroserviceClicked(microservice)">
        <v-list-item-avatar>
          <v-icon>{{ microservice.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="microservice.name" />
          <v-list-item-subtitle v-html="microservice.description" />
        </v-list-item-content>
      </v-list-item>
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
