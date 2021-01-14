<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Remote Connection Settings"
    :loaded="loaded"
    :visible="dialogVisible"
    createLabel="Ok"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <v-card flat class="ma-2">
      <remote-instances-list :remoteInstances="remotes" />
    </v-card>
    <v-divider />
    <v-card flat class="ml-2 mr-2 mb-0 mt-4">
      <remote-instance-details class="pa-1" @added="onConnectionAdded" />
    </v-card>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { BaseDialog, DialogComponent } from "sitewhere-ide-components";

import RemoteInstancesList from "./RemoteInstancesList.vue";
import RemoteInstanceDetails from "./RemoteInstanceDetails.vue";

import { IRemoteInstances, IRemoteInstance } from "sitewhere-ide-common";

@Component({
  components: {
    BaseDialog,
    RemoteInstancesList,
    RemoteInstanceDetails,
  },
})
export default class RemotesDialog extends DialogComponent<IRemoteInstances> {
  @Ref() readonly dialog!: ITabbedComponent;

  remotes: IRemoteInstances | null = null;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Remotes;
  }

  // Reset dialog contents.
  reset() {}

  // Load dialog from a given payload.
  load(payload: IRemoteInstances) {
    this.remotes = JSON.parse(JSON.stringify(payload));
    this.reset();
  }

  // Called when a new instance is added.
  onConnectionAdded(added: IRemoteInstance) {
    if (this.remotes) {
      this.remotes.instances.push(added);
    }
  }

  // Called after create button is clicked.
  onCreateClicked() {
    this.$emit("save", this.remotes);
  }
}
</script>
