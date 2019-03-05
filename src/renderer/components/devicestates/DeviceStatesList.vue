<template>
  <div>
    <navigation-page
      icon="fa-microchip"
      title="Manage Device States"
      loadingMessage="Loading device states ..."
      :loaded="loaded"
    >
      <div slot="actions"></div>
      <div slot="content">
        <v-card>
          <v-card-text>Device States</v-card-text>
        </v-card>
        <pager :results="results" @pagingUpdated="updatePaging"></pager>
      </div>
    </navigation-page>
  </div>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import Pager from "../common/Pager";

import { searchDeviceStates } from "../../rest/sitewhere-device-states-api";

export default {
  data: () => ({
    results: null,
    paging: null,
    deviceStates: null,
    loaded: false
  }),

  components: {
    NavigationPage,
    Pager
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },
    // Refresh list of sites.
    refresh: function() {
      this.$data.loaded = false;
      let paging = this.$data.paging;
      let component = this;

      let criteria = {};
      criteria.pageNumber = paging.page;
      criteria.pageSize = paging.pageSize;

      let options = {};
      options.includeDevice = true;
      options.includeDeviceType = true;
      options.includeCustomer = true;
      options.includeArea = true;
      options.includeAsset = true;
      options.includeEventDetails = true;

      searchDeviceStates(this.$store, criteria, options)
        .then(function(response) {
          component.loaded = true;
          component.results = response.data;
          component.deviceStates = response.data.results;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    }
  }
};
</script>

<style scoped>
</style>
