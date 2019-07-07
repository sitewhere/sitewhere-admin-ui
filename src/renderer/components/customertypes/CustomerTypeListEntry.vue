<template>
  <sw-list-entry>
    <v-container @click="onCustomerTypeClicked">
      <v-layout row>
        <v-flex xs2>
          <v-card-media class="pt-2 pl-1">
            <font-awesome-icon class="grey--text" :icon="customerType.icon" size="3x"/>
          </v-card-media>
        </v-flex>
        <v-flex xs10>
          <div>
            <div class="title ellipsis mb-1">{{ customerType.name }}</div>
            <div class="ctdesc">{{ customerType.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </sw-list-entry>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import { ICustomerType } from "sitewhere-rest-api";

@Component({})
export default class CustomerTypeListEntry extends Vue {
  @Prop() readonly customerType!: ICustomerType;

  // Handle customer type clicked.
  onCustomerTypeClicked() {
    this.$emit("openCustomerType", this.customerType);
  }
}
</script>

<style scoped>
.ctdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
