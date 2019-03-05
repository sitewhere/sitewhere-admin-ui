<template>
  <div>
    <area-dialog
      title="Edit Area"
      width="600"
      resetOnOpen="true"
      createLabel="Update"
      cancelLabel="Cancel"
      @payload="onCommit"
      :parentArea="parentArea"
    ></area-dialog>
  </div>
</template>

<script>
import FloatingActionButton from "../common/FloatingActionButton";
import AreaDialog from "./AreaDialog";

import { getArea, updateArea } from "../../rest/sitewhere-areas-api";

export default {
  data: () => ({}),

  components: {
    FloatingActionButton,
    AreaDialog
  },

  props: ["token", "parentArea"],

  methods: {
    // Send event to open dialog.
    onOpenDialog: function() {
      var component = this;
      getArea(this.$store, this.token)
        .then(function(response) {
          component.onDataLoaded(response);
        })
        .catch(function(e) {});
    },

    // Called after data is loaded.
    onDataLoaded: function(response) {
      this.$children[0].load(response.data);
      this.$children[0].openDialog();
    },

    // Handle payload commit.
    onCommit: function(payload) {
      var component = this;
      updateArea(this.$store, this.token, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.$children[0].closeDialog();
      this.$emit("areaUpdated");
    }
  }
};
</script>

<style scoped>
</style>
