<template>
  <div>
    <v-data-table
      v-if="mxs && mxs.length > 0"
      class="elevation-2 pa-0"
      :headers="headers"
      :items="mxs"
      :hide-actions="true"
      no-data-text="No Measurements Found for Customer"
      :total-items="0"
    >
      <template slot="items" slot-scope="props">
        <td width="30%" :title="props.item.assetName">{{ props.item.assetName }}</td>
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
    <pager :pageSizes="pageSizes" :results="results" @pagingUpdated="updatePaging">
      <no-results-panel slot="noresults" text="No Measurements Found"></no-results-panel>
    </pager>
  </div>
</template>

<script>
import Pager from "../common/Pager";
import NoResultsPanel from "../common/NoResultsPanel";

import { listMeasurementsForCustomer } from "../../rest/sitewhere-customers-api";

export default {
  data: () => ({
    results: null,
    paging: null,
    mxs: null,
    headers: [
      {
        align: "left",
        sortable: false,
        text: "Asset",
        value: "asset"
      },
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

  props: ["customer"],

  components: {
    Pager,
    NoResultsPanel
  },

  watch: {
    // Refresh component if customer is updated.
    customer: function(value) {
      this.refresh();
    }
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
      var customerToken = this.customer.token;
      var query = this.$data.paging.query;
      listMeasurementsForCustomer(this.$store, customerToken, query)
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
    },

    // Format date.
    formatDate: function(date) {
      if (!date) {
        return "N/A";
      }
      return this.$moment(date).format("YYYY-MM-DD H:mm:ss");
    }
  }
};
</script>

<style scoped>
</style>
