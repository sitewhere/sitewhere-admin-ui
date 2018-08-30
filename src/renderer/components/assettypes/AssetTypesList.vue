<template>
  <navigation-page icon="cog" title="Asset Types"
    loadingMessage="Loading asset types ..." :loaded="loaded">
    <div v-if="assetTypes" slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;">
        <v-layout row wrap>
           <v-flex xs6 v-for="(assetType) in assetTypes"
            :key="assetType.token">
            <asset-type-list-entry :assetType="assetType"
              @assetTypeOpened="onOpenAssetType" @assetTypeDeleted="refresh">
            </asset-type-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <asset-type-create-dialog ref="add" @assetTypeAdded="onAssetTypeAdded"/>
    </div>
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Asset Type"
        @action="onAddAssetType">
      </navigation-action-button>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import Pager from "../common/Pager";
import AssetTypeListEntry from "./AssetTypeListEntry";
import AssetTypeCreateDialog from "./AssetTypeCreateDialog";
import { _listAssetTypes } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    results: null,
    paging: null,
    assetTypes: [],
    loaded: false
  }),

  components: {
    NavigationPage,
    NavigationActionButton,
    Pager,
    AssetTypeListEntry,
    AssetTypeCreateDialog
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
      var options = {};
      _listAssetTypes(this.$store, options, paging)
        .then(function(response) {
          component.loaded = true;
          component.results = response.data;
          component.$data.assetTypes = response.data.results;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },

    // Called on open.
    onOpenAssetType: function(token) {
      var tenant = this.$store.getters.selectedTenant;
      if (tenant) {
        this.$router.push("/tenants/" + tenant.token + "/assettypes/" + token);
      }
    },

    // Called to open dialog.
    onAddAssetType: function() {
      this.$refs.add.onOpenDialog();
    },

    // Called on add.
    onAssetTypeAdded: function() {
      this.refresh();
    }
  }
};
</script>

<style scoped>
</style>
