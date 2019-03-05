<template>
  <navigation-page
    icon="cubes"
    title="Manage Device Groups"
    loadingMessage="Loading device groups ..."
    :loaded="loaded"
  >
    <div slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="groups">
        <v-layout row wrap>
          <v-flex xs6 v-for="(group) in groups" :key="group.token">
            <device-group-list-panel :group="group" class="mb-1" @click.native="onOpenGroup(group)"></device-group-list-panel>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" :pageSizes="pageSizes" @pagingUpdated="updatePaging"></pager>
      <device-group-create-dialog ref="add" @groupAdded="refresh"></device-group-create-dialog>
    </div>
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Device Group" @action="onAddDeviceGroup"></navigation-action-button>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import Pager from "../common/Pager";
import DeviceGroupListPanel from "./DeviceGroupListPanel";
import DeviceGroupCreateDialog from "./DeviceGroupCreateDialog";

import { routeTo } from "../common/Utils";
import { listDeviceGroups } from "../../rest/sitewhere-device-groups-api";

export default {
  data: () => ({
    results: null,
    paging: null,
    groups: null,
    filter: null,
    pageSizes: [
      {
        text: "20",
        value: 20
      },
      {
        text: "50",
        value: 50
      },
      {
        text: "100",
        value: 100
      }
    ],
    loaded: false
  }),

  components: {
    NavigationPage,
    NavigationActionButton,
    Pager,
    DeviceGroupListPanel,
    DeviceGroupCreateDialog
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
      let paging = this.$data.paging.query;
      let component = this;
      listDeviceGroups(this.$store, null, false, paging)
        .then(function(response) {
          component.loaded = true;
          component.results = response.data;
          component.groups = response.data.results;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },

    // Called to open detail page for group.
    onOpenGroup: function(group) {
      routeTo(this, "/groups/" + group.token);
    },

    // Called to open dialog.
    onAddDeviceGroup: function() {
      this.$refs.add.onOpenDialog();
    }
  }
};
</script>

<style scoped>
</style>
