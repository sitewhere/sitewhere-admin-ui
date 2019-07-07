<template>
  <div>
    <div v-if="customer">
      <v-card-text>{{ chosenText }}</v-card-text>
      <v-list two-line>
        <v-list-tile avatar :key="customer.token">
          <v-list-tile-avatar>
            <img :src="customer.imageUrl" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="customer.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="customer.description"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple @click="onCustomerRemoved(true)">
              <v-icon class="grey--text">remove_circle</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <div v-else>
      <v-card-text>{{ notChosenText }}</v-card-text>
      <v-list v-if="customers" class="item-list" two-line>
        <template v-for="customer in customers">
          <v-list-tile avatar :key="customer.token" @click="onCustomerChosen(customer, true)">
            <v-list-tile-avatar>
              <img :src="customer.imageUrl" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="customer.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="customer.description"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import { AxiosResponse } from "axios";
import { listCustomers } from "../../rest/sitewhere-customers-api";
import {
  ICustomer,
  ICustomerSearchResults,
  ICustomerResponseFormat,
  ICustomerSearchCriteria
} from "sitewhere-rest-api";

@Component({})
export default class CustomerChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  item: ICustomer | null = null;
  items: ICustomer[] = [];

  /** Initially load all */
  created() {
    this.refresh();
  }

  /** Refresh list */
  async refresh() {
    let format: ICustomerResponseFormat = {};
    let criteria: ICustomerSearchCriteria = {};
    let response: AxiosResponse<ICustomerSearchResults> = await listCustomers(
      this.$store,
      criteria,
      format
    );
    this.items = response.data.results;
    if (this.value) {
      this.onValueUpdated(this.value);
    }
  }

  @Watch("value", { immediate: true })
  onValueChanged(updated: string) {
    this.onValueUpdated(updated);
  }

  /** Called to update choice based on token */
  onValueUpdated(token: string) {
    let found: boolean = false;
    this.items.forEach(item => {
      if (item.token === token) {
        found = true;
        this.onItemChosen(item, false);
      }
    });
    if (!found) {
      this.onItemRemoved(false);
    }
  }

  /** Called when item is chosen */
  onItemChosen(item: ICustomer, emit: boolean) {
    this.item = item;
    if (emit) {
      this.$emit("input", item.token);
    }
  }

  /** Remove item selection */
  onItemRemoved(emit: boolean) {
    this.item = null;
    if (emit) {
      this.$emit("input", null);
    }
  }
}
</script>

<style scoped>
.item-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
