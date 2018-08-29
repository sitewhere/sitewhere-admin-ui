<template>
  <navigation-page icon="map" title="Areas"
    loadingMessage="Loading areas ..." :loaded="loaded">
    <div slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="areas">
        <v-layout row wrap>
           <v-flex xs6 v-for="(area) in areas" :key="area.token">
            <area-list-entry :area="area" @openArea="onOpenArea">
            </area-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <area-create-dialog @areaAdded="onAreaAdded"/>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import Utils from "../common/Utils";
import Pager from "../common/Pager";
import AreaListEntry from "./AreaListEntry";
import AreaCreateDialog from "./AreaCreateDialog";
import { _listAreas } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    results: null,
    paging: null,
    areas: null,
    loaded: false
  }),

  components: {
    NavigationPage,
    Pager,
    AreaListEntry,
    AreaCreateDialog
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },
    // Refresh list of areas.
    refresh: function() {
      this.$data.loaded = false;
      var paging = this.$data.paging.query;
      var component = this;

      // Search options.
      let options = {};
      options.includeAreaType = true;
      options.includeAssignments = false;
      options.includeZones = false;

      _listAreas(this.$store, options, paging)
        .then(function(response) {
          component.loaded = true;
          component.results = response.data;
          component.areas = response.data.results;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },
    // Called to open an area.
    onOpenArea: function(area) {
      Utils.routeTo(this, "/areas/" + area.token);
    },
    // Called when a new area is added.
    onAreaAdded: function() {
      this.refresh();
    }
  }
};
</script>

<style scoped>
</style>
