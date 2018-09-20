<template>
  <base-dialog :title="title" :width="width" :visible="dialogVisible"
    :createLabel="createLabel" :cancelLabel="cancelLabel" :error="error"
    @createClicked="onCreateClicked" @cancelClicked="onCancelClicked">
    <v-tabs dark v-model="active">
      <v-tabs-bar slot="activators">
        <v-tabs-slider></v-tabs-slider>
        <v-tabs-item key="details" href="#details">
          Measurement Details
        </v-tabs-item>
        <slot name="tabitem"></slot>
        <v-tabs-item key="metadata" href="#metadata">
          Metadata
        </v-tabs-item>
      </v-tabs-bar>
      <slot name="tabcontent"></slot>
      <v-tabs-content key="details" id="details">
        <measurements-panel :mxs="mxs"
          @mxDeleted="onMxDeleted" @mxAdded="onMxAdded">
        </measurements-panel>
      </v-tabs-content>
    </v-tabs>
  </base-dialog>
</template>

<script>
import Utils from "../common/Utils";
import BaseDialog from "../common/BaseDialog";
import MeasurementsPanel from "./MeasurementsPanel";

export default {

  data: () => ({
    active: null,
    menu: null,
    dialogVisible: false,
    mxs: [],
    error: null
  }),

  components: {
    BaseDialog,
    MeasurementsPanel
  },

  props: ["title", "width", "createLabel", "cancelLabel"],

  methods: {
    // Generate payload from UI.
    generatePayload: function () {
      var payload = {};
      payload.measurements = this.$data.mxs;
      //Utils.arrayToMetadata(this.$data.mxs);
      return payload;
    },

    // Reset dialog contents.
    reset: function (e) {
      this.$data.mxs = [];
      this.$data.active = "details";
    },

    // Load dialog from a given payload.
    load: function (payload) {
      this.reset();

      if (payload) {
        this.$data.mxs = Utils.metadataToArray(payload.measurements);
      }
    },

    // Called to open the dialog.
    openDialog: function () {
      this.$data.dialogVisible = true;
    },

    // Called to open the dialog.
    closeDialog: function () {
      this.$data.dialogVisible = false;
    },

    // Called to show an error message.
    showError: function (error) {
      this.$data.error = error;
    },

    // Called after create button is clicked.
    onCreateClicked: function (e) {
      var payload = this.generatePayload();
      this.$emit("payload", payload);
    },

    // Called after cancel button is clicked.
    onCancelClicked: function (e) {
      this.$data.dialogVisible = false;
    },

    // Called when a measurement entry has been deleted.
    onMxDeleted: function (name) {
      var mxs = this.$data.mxs;
      for (var i = 0; i < mxs.length; i++) {
        if (mxs[i].name === name) {
          mxs.splice(i, 1);
        }
      }
    },

    // Called when a measurement entry has been added.
    onMxAdded: function (entry) {
      var mxs = this.$data.mxs;
      mxs.push(entry);
    }
  }
}
</script>

<style scoped>
</style>
