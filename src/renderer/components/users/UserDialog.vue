<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="details" href="#details">User Details</v-tab>
      <v-tab key="permissions" href="#permissions">Permissions</v-tab>
      <v-tab key="metadata" href="#metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details" id="details">
        <user-detail-fields ref="details"/>
      </v-tab-item>
      <v-tab-item key="permissions" id="permissions">
        <user-permissions ref="permissions"/>
      </v-tab-item>
      <v-tab-item key="metadata" id="metadata">
        <metadata-panel ref="metadata"/>
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import {
  DialogComponent,
  DialogSection
} from "../../libraries/component-model";
import { ITabbedComponent, Refs } from "../../libraries/navigation-model";
import { NavigationIcon } from "../../libraries/constants";
import { Component } from "vue-property-decorator";

import BaseDialog from "../common/BaseDialog.vue";
import UserDetailFields from "./UserDetailFields.vue";
import UserPermissions from "./UserPermissions.vue";
import MetadataPanel from "../common/MetadataPanel.vue";
import { IUser } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    UserDetailFields,
    UserPermissions,
    MetadataPanel
  }
})
export default class UserDialog extends DialogComponent<IUser> {
  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DialogSection;
    permissions: DialogSection;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.User;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.permissions.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.permissions) {
      this.$refs.permissions.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
    this.$refs.dialog.setActiveTab("details");
  }

  // Load dialog from a given payload.
  load(payload: IUser) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.permissions) {
      this.$refs.permissions.load(payload);
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab("details");
      return;
    }

    if (!this.$refs.permissions.validate()) {
      this.$refs.dialog.setActiveTab("permissions");
      return;
    }

    var payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>

<style scoped>
</style>
