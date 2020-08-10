<template>
  <list-entry>
    <v-container @click="onCustomerTypeClicked">
      <v-layout row>
        <v-flex xs3>
          <branding-image :style="logoStyle" :entity="customerType" />
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis mt-1 mb-2">{{ customerType.name }}</div>
            <div class="ctdesc caption">{{ customerType.description }}</div>
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

import { IStyle } from "../common/Style";
import { ICustomerType } from "sitewhere-rest-api";

@Component({
  components: {
    ListEntry,
    BrandingImage,
  },
})
export default class CustomerTypeListEntry extends Vue {
  @Prop() readonly customerType!: ICustomerType;

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      height: "80px",
      width: "80px",
    };
  }

  // Handle customer type clicked.
  onCustomerTypeClicked() {
    this.$emit("open", this.customerType);
  }
}
</script>

<style scoped>
.ctdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
