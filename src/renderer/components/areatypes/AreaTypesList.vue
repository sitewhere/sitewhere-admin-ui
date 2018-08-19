<template>
  <navigation-page icon="cog" title="Area Types"
    loadingMessage="Loading area types ..." :loaded="loaded">
    <div v-if="areaTypes" slot="content">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
           <v-flex xs6 v-for="(areaType) in areaTypes" :key="areaType.token">
            <area-type-list-entry :areaType="areaType" :areaTypes="areaTypes"
              @areaTypeOpened="onOpenAreaType" @areaTypeDeleted="refresh">
            </area-type-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <area-type-create-dialog @areaTypeAdded="onAreaTypeAdded"
        :areaTypes="areaTypes"/>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import Pager from "../common/Pager";
import AreaTypeListEntry from "./AreaTypeListEntry";
import AreaTypeCreateDialog from "./AreaTypeCreateDialog";
import { _listAreaTypes } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    results: null,
    paging: null,
    areaTypes: [],
    loaded: false
  }),

  components: {
    NavigationPage,
    Pager,
    AreaTypeListEntry,
    AreaTypeCreateDialog
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },

    // Refresh list of area types.
    refresh: function() {
      this.$data.loaded = false;
      var paging = this.$data.paging.query;
      var component = this;
      _listAreaTypes(this.$store, false, paging)
        .then(function(response) {
          component.loaded = true;
          component.results = response.data;
          component.$data.areaTypes = response.data.results;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },

    // Called when an area type is clicked.
    onOpenAreaType: function(token) {
      var tenant = this.$store.getters.selectedTenant;
      if (tenant) {
        this.$router.push("/tenants/" + tenant.id + "/areatypes/" + token);
      }
    },

    // Called when a new area type is added.
    onAreaTypeAdded: function() {
      this.refresh();
    }
  }
};
</script>

<style scoped>
</style>
