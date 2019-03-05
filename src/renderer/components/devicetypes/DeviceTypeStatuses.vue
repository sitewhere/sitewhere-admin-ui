<template>
  <div>
    <v-container fluid grid-list-md v-if="statuses">
      <v-layout row wrap>
        <no-results-panel
          v-if="statuses.length === 0"
          text="No Device Statuses Found for Device Type"
        ></no-results-panel>
        <div v-else>
          <v-flex xs4 v-for="status in statuses" :key="status.code">
            <div>
              <device-status-panel
                :status="status"
                :deviceType="deviceType"
                @statusDeleted="refresh"
                @statusUpdated="refresh"
              ></device-status-panel>
            </div>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NoResultsPanel from "../common/NoResultsPanel";
import DeviceStatusPanel from "../statuses/DeviceStatusPanel";

import { listDeviceStatuses } from "../../rest/sitewhere-device-statuses-api";

export default {
  data: () => ({
    statuses: null
  }),

  props: ["deviceType"],

  components: {
    NoResultsPanel,
    DeviceStatusPanel
  },

  created: function() {
    this.refresh();
  },

  methods: {
    // Refresh list of assignments.
    refresh: function() {
      var component = this;
      let options = {
        deviceTypeToken: this.deviceType.token
      };
      listDeviceStatuses(this.$store, options)
        .then(function(response) {
          component.statuses = response.data.results;
        })
        .catch(function(e) {});
    }
  }
};
</script>

<style scoped>
</style>
