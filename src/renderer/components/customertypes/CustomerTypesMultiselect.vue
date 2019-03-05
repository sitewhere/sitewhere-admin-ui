<template>
  <v-card hover color="white">
    <v-list v-if="customerTypes">
      <template v-for="(customerType) in customerTypes">
        <v-list-tile :key="customerType.id">
          <v-list-tile-action>
            <v-checkbox v-model="selected" :value="customerType.id"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <font-awesome-icon class="grey--text mr-2" :icon="customerType.icon" size="lg"/>
              {{ customerType.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="'div-' + customerType.id"></v-divider>
      </template>
    </v-list>
    <v-card-text v-else>No customer types available.</v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    selected: []
  }),

  props: ["selectedCustomerTypeIds", "customerTypes"],

  computed: {
    // Indexes customer types by id.
    customerTypesById: function() {
      let ctById = {};
      if (this.customerTypes) {
        for (let i = 0; i < this.customerTypes.length; i++) {
          let ct = this.customerTypes[i];
          ctById[ct.id] = ct;
        }
      }
      return ctById;
    }
  },

  watch: {
    // Update list selection.
    selectedCustomerTypeIds: function(value) {
      this.$data.selected = value;
    },
    // Reflect selection updates to listeners.
    selected: function(value) {
      let ctById = this.customerTypesById;
      let selectedCts = [];
      for (let i = 0; i < value.length; i++) {
        let ct = ctById[value[i]];
        if (ct) {
          selectedCts.push(ct);
        }
      }
      this.$emit("selectedCustomerTypesUpdated", selectedCts);
    }
  },

  methods: {}
};
</script>

<style scoped>
</style>
