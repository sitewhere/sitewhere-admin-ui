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
      <v-tab key="details">User Details</v-tab>
      <v-tab key="permissions">Permissions</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details" eager>
        <user-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="permissions" eager>
        <user-permissions ref="permissions" />
      </v-tab-item>
      <v-tab-item key="metadata" eager>
        <metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  DialogComponent,
  DialogSection,
  BaseDialog,
  MetadataPanel
} from "sitewhere-ide-components";

import UserDetailFields from "./UserDetailFields.vue";
import UserPermissions from "./UserPermissions.vue";
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
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: UserDetailFields;
  @Ref() readonly permissions!: UserPermissions;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.User;
  }

  // Generate payload from UI.
  generatePayload() {
    const payload: any = {};
    Object.assign(
      payload,
      this.details.save(),
      this.permissions.save(),
      this.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.permissions) {
      this.permissions.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    this.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IUser) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.permissions) {
      this.permissions.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    if (!this.permissions.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }

    const payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>
