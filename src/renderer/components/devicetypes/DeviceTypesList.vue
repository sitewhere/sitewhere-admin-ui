<template>
  <navigation-page icon="cog" title="Manage Device Types"
    loadingMessage="Loading device types ..." :loaded="loaded">
    <div slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="deviceTypes">
        <v-layout row wrap>
           <v-flex xs6 v-for="(deviceType) in deviceTypes"
            :key="deviceType.token">
            <device-type-list-entry :deviceType="deviceType">
            </device-type-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <device-type-create-dialog ref="add" @deviceTypeAdded="onDeviceTypeAdded"/>
    </div>
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Device Type"
        @action="onAddDeviceType">
      </navigation-action-button>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import Pager from "../common/Pager";
import DeviceTypeListEntry from "./DeviceTypeListEntry";
import DeviceTypeCreateDialog from "./DeviceTypeCreateDialog";
import { _listDeviceTypes } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    results: null,
    paging: null,
    deviceTypes: null,
    loaded: false
  }),

  components: {
    NavigationPage,
    NavigationActionButton,
    Pager,
    DeviceTypeListEntry,
    DeviceTypeCreateDialog
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },

    // Refresh data.
    refresh: function() {
      this.$data.loaded = false;
      var paging = this.$data.paging.query;
      var component = this;
      _listDeviceTypes(this.$store, false, true, paging)
        .then(function(response) {
          component.loaded = true;
          component.results = response.data;
          component.deviceTypes = response.data.results;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },

    // Called to open dialog.
    onAddDeviceType: function() {
      this.$refs.add.onOpenDialog();
    },

    // Called when a new device type is added.
    onDeviceTypeAdded: function() {
      this.refresh();
    }
  }
};
</script>

<style scoped>
</style>
