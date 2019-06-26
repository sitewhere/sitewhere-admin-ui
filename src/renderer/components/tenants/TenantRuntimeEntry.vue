<template>
  <div>
    <v-chip @click="onChipClicked" :color="backgroundColor" :text-color="foregroundColor">
      <component-status-icon :status="tenantState.componentState.status"></component-status-icon>
      {{ tenantState.microservice.hostname }} ({{ tenantState.componentState.status }})
    </v-chip>
    <tenant-engine-components-dialog
      :tenantState="tenantState"
      :dialogVisible="dialogVisible"
      @closeClicked="onCloseClicked"
    ></tenant-engine-components-dialog>
  </div>
</template>

<script>
import TenantEngineComponentsDialog from "./TenantEngineComponentsDialog";
import ComponentStatusIcon from "./ComponentStatusIcon";

export default {
  data: () => ({
    dialogVisible: false
  }),

  components: {
    TenantEngineComponentsDialog,
    ComponentStatusIcon
  },

  props: ["tenantState"],

  computed: {
    backgroundColor: function() {
      var status = this.tenantState.componentState.status;
      if (status === "Initializing") {
        return "green";
      } else if (status === "InitializationError") {
        return "red";
      } else if (status === "Starting") {
        return "green";
      } else if (status === "Started") {
        return "green";
      } else if (status === "StartedWithErrors") {
        return "red";
      } else if (status === "Stopping") {
        return "grey";
      } else if (status === "Stopped") {
        return "grey";
      } else if (status === "StoppedWithErrors") {
        return "red";
      } else if (status === "Terminating") {
        return "grey";
      } else if (status === "Terminated") {
        return "grey";
      } else if (status === "LifecycleError") {
        return "red";
      } else {
        return "grey";
      }
    },
    foregroundColor: function() {
      var status = this.tenantState.componentState.status;
      if (status === "Initializing") {
        return "white";
      } else if (status === "InitializationError") {
        return "white";
      } else if (status === "Starting") {
        return "white";
      } else if (status === "Started") {
        return "white";
      } else if (status === "StartedWithErrors") {
        return "white";
      } else if (status === "Stopping") {
        return "black";
      } else if (status === "Stopped") {
        return "black";
      } else if (status === "StoppedWithErrors") {
        return "white";
      } else if (status === "Terminating") {
        return "black";
      } else if (status === "Terminated") {
        return "black";
      } else if (status === "LifecycleError") {
        return "white";
      } else {
        return "black";
      }
    },
    identClass: function() {
      var status = this.tenantState.componentState.status;
      if (status === "Initializing") {
        return ["green--text", "text--darken-3", "pr-2"];
      } else if (status === "InitializationError") {
        return ["red--text", "text--darken-3", "pr-2"];
      } else if (status === "Starting") {
        return ["green--text", "text--darken-3", "pr-2"];
      } else if (status === "Started") {
        return ["green--text", "text--darken-3", "pr-2"];
      } else if (status === "StartedWithErrors") {
        return ["red--text", "text--darken-3", "pr-2"];
      } else if (status === "Stopping") {
        return ["grey--text", "text--darken-3", "pr-2"];
      } else if (status === "Stopped") {
        return ["grey--text", "text--darken-3", "pr-2"];
      } else if (status === "StoppedWithErrors") {
        return ["red--text", "text--darken-3", "pr-2"];
      } else if (status === "Terminating") {
        return ["grey--text", "text--darken-3", "pr-2"];
      } else if (status === "Terminated") {
        return ["grey--text", "text--darken-3", "pr-2"];
      } else if (status === "LifecycleError") {
        return ["red--text", "text--darken-3", "pr-2"];
      } else {
        return ["grey--text", "text--darken-3", "pr-2"];
      }
    }
  },

  methods: {
    onChipClicked: function() {
      this.$data.dialogVisible = true;
    },

    onCloseClicked: function() {
      this.$data.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
</style>
