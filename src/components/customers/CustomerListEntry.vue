<template>
  <list-entry style="min-height: 150px">
    <v-container @click="onCustomerClicked">
      <v-layout row>
        <v-flex xs3>
          <branding-image :style="logoStyle" :entity="customer" />
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis mt-1 mb-2">{{ customer.name }}</div>
            <div class="custdesc caption">{{ customer.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </list-entry>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import BrandingImage from "../common/BrandingImage.vue";
import { ListEntry } from "sitewhere-ide-components";

import { ICustomer } from "sitewhere-rest-api";
import { IStyle } from "../common/Style";

@Component({
  components: {
    ListEntry,
    BrandingImage
  }
})
export default class CustomerListEntry extends Vue {
  @Prop() readonly customer!: ICustomer;

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      height: "120px",
      width: "120px",
      "padding-left": "15px"
    };
  }

  // Handle customer clicked.
  onCustomerClicked() {
    this.$emit("open", this.customer);
  }
}
</script>

<style scoped>
.custdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
