<template>
  <div>
    <v-layout row wrap v-if="mxs">
      <v-flex xs12>
        <no-results-panel v-if="mxs.length === 0" text="No Measurement Events Found for Assignment"></no-results-panel>
        <v-data-table
          v-if="mxs.length > 0"
          class="elevation-2 pa-0"
          :headers="headers"
          :items="mxs"
          :hide-actions="true"
          :total-items="0"
        >
          <template slot="items" slot-scope="props">
            <td width="25%" :title="props.item.name">{{ props.item.name }}</td>
            <td width="25%" :title="props.item.value">{{ props.item.value }}</td>
            <td
              width="10%"
              style="white-space: nowrap"
              :title="formatDate(props.item.eventDate)"
            >{{ formatDate(props.item.eventDate) }}</td>
            <td
              width="10%"
              style="white-space: nowrap"
              :title="formatDate(props.item.receivedDate)"
            >{{ formatDate(props.item.receivedDate) }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <pager :pageSizes="pageSizes" :results="results" @pagingUpdated="updatePaging"></pager>
  </div>
</template>

<script>
import Pager from "../common/Pager";
import NoResultsPanel from "../common/NoResultsPanel";

import { formatDate } from "../common/Utils";
import { listMeasurementsForAssignment } from "../../rest/sitewhere-device-assignments-api";

export default {
  data: () => ({
    results: null,
    paging: null,
    mxs: null,
    headers: [
      {
        align: "left",
        sortable: false,
        text: "Measurement Name",
        value: "mxname"
      },
      {
        align: "left",
        sortable: false,
        text: "Measurement Value",
        value: "mxvalue"
      },
      {
        align: "left",
        sortable: false,
        text: "Event Date",
        value: "event"
      },
      {
        align: "left",
        sortable: false,
        text: "Received Date",
        value: "received"
      }
    ],
    pageSizes: [
      {
        text: "25",
        value: 25
      },
      {
        text: "50",
        value: 50
      },
      {
        text: "100",
        value: 100
      }
    ]
  }),

  props: ["token"],

  components: {
    Pager,
    NoResultsPanel
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },

    // Refresh list of assignments.
    refresh: function() {
      var component = this;
      var query = this.$data.paging.query;
      listMeasurementsForAssignment(this.$store, this.token, query)
        .then(function(response) {
          component.results = response.data;
          component.mxs = response.data.results;
        })
        .catch(function(e) {});
    },

    // Called when page number is updated.
    onPageUpdated: function(pageNumber) {
      this.$data.pager.page = pageNumber;
      this.refresh();
    }
  }
};
</script>

<style scoped>
</style>
