<template>
  <v-card flat hover color="white">
    <v-container @click="onCustomerClicked">
      <v-layout row>
        <v-flex xs3>
          <v-card-media>
            <div :style="logoStyle"></div>
          </v-card-media>
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis">{{ customer.name }}</div>
            <div class="custdesc">{{ customer.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { ICustomer } from "sitewhere-rest-api";

@Component
export default class DeviceTypeSelector extends Vue {
  @Prop() readonly customer!: ICustomer;

  // Compute style of logo.
  get logoStyle() {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.customer.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%",
      border: "1px solid #eee",
      height: "120px",
      width: "100px"
    };
  }

  // Handle customer clicked.
  onCustomerClicked() {
    this.$emit("openCustomer", this.customer);
  }
}
</script>

<style scoped>
.custdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
