<template>
  <sw-base-dialog
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
      <remote-connections-list :remotes="remotes" />
    </v-card>
    <v-divider />
    <v-card flat class="ml-2 mr-2 mb-0 mt-4">
      <remote-connection-details class="pa-1" @added="onConnectionAdded" />
    </v-card>
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import RemoteConnectionsList from "./RemoteConnectionsList.vue";
import RemoteConnectionDetails from "./RemoteConnectionDetails.vue";

import { IRemotes, IRemoteConnection } from "../common/ApplicationModel";

@Component({
  components: {
    RemoteConnectionsList,
    RemoteConnectionDetails
  }
})
export default class RemotesDialog extends DialogComponent<IRemotes> {
  remotes: IRemotes | null = null;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    connections: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Remotes;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.connections.reset();
    }
  }

  // Load dialog from a given payload.
  load(payload: IRemotes) {
    this.remotes = JSON.parse(JSON.stringify(payload));
    this.reset();
    if (this.$refs.connections) {
      this.$refs.connections.load(payload);
    }
  }

  // Called when a new connection is added.
  onConnectionAdded(added: IRemoteConnection) {
    if (this.remotes) {
      this.remotes.connections.push(added);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    this.$emit("save", this.remotes);
  }
}
</script>
