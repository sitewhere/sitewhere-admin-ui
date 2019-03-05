<template>
  <v-select
    :items="customers"
    item-text="name"
    item-value="token"
    v-model="selectedToken"
    hide-details
    single-line
  ></v-select>
</template>

<script>
import { listCustomers } from "../../rest/sitewhere-customers-api";

export default {
  data: () => ({
    customers: [],
    selectedToken: null
  }),

  props: ["value"],

  watch: {
    value: function(updated) {
      this.$data.selectedToken = updated;
    },
    selectedToken: function(updated) {
      this.$emit("input", updated);
    }
  },

  // Initially load list of all customers.
  created: function() {
    this.$data.selectedToken = this.value;
    var component = this;
    listCustomers(component.$store, {}, "page=1&pageSize=0")
      .then(function(response) {
        component.$data.customers = response.data.results;
      })
      .catch(function(e) {});
  },

  methods: {}
};
</script>

<style scoped>
</style>
