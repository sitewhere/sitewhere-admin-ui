<template>
  <v-select
    :items="scripts"
    item-text="name"
    item-value="id"
    v-model="selectedId"
    hide-details
    single-line
  ></v-select>
</template>

<script>
import { listTenantScriptMetadata } from "../../rest/sitewhere-scripting-api";

export default {
  data: () => ({
    scripts: [],
    selectedId: null
  }),

  props: ["value", "identifier", "tenantToken"],

  watch: {
    value: function(updated) {
      this.$data.selectedId = updated;
    },
    selectedId: function(updated) {
      this.$emit("input", updated);
    }
  },

  // Initially load list of all scripts.
  created: function() {
    this.$data.selectedId = this.value;
    var component = this;
    listTenantScriptMetadata(
      component.$store,
      this.identifier,
      this.tenantToken
    )
      .then(function(response) {
        component.$data.scripts = response.data;
      })
      .catch(function(e) {});
  },

  methods: {}
};
</script>
