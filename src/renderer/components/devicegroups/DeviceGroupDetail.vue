<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading device group ..."
    :loaded="loaded"
    :record="deviceGroup"
  >
    <template slot="header">
      <device-group-detail-header
        :record="deviceGroup"
        @deviceGroupUpdated="refresh"
        @deviceGroupDeleted="onDeviceGroupDeleted"
      />
    </template>
    <template slot="tabs">
      <v-tab key="elements">Group Elements</v-tab>
    </template>
    <template slot="tab-items">
      <device-group-elements tabkey="elements" ref="list" :deviceGroup="deviceGroup" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Group Element" @action="onAddGroupElement" />
      <edit-button tooltip="Edit Device Group" @action="onEdit" />
      <delete-button tooltip="Delete Device Group" @action="onDelete" />
    </template>
    <template slot="dialogs">
      <device-group-element-create-dialog ref="create" :token="token" @created="onElementAdded" />
      <device-group-update-dialog ref="edit" :token="token" @deviceGroupUpdated="refresh" />
      <device-group-delete-dialog ref="delete" :token="token" @groupDeleted="onDeviceGroupDeleted" />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import DeviceGroupDetailHeader from "./DeviceGroupDetailHeader.vue";
import DeviceGroupUpdateDialog from "./DeviceGroupUpdateDialog.vue";
import DeviceGroupDeleteDialog from "./DeviceGroupDeleteDialog.vue";
import DeviceGroupElements from "./DeviceGroupElements.vue";
import DeviceGroupElementCreateDialog from "./DeviceGroupElementCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getDeviceGroup } from "../../rest/sitewhere-device-groups-api";
import { IDeviceGroup, IDeviceGroupResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceGroupDetailHeader,
    DeviceGroupUpdateDialog,
    DeviceGroupDeleteDialog,
    DeviceGroupElements,
    DeviceGroupElementCreateDialog,
    AddButton,
    EditButton,
    DeleteButton
  }
})
export default class DeviceGroupDetail extends DetailComponent<IDeviceGroup> {
  active: string | null = null;

  // References.
  $refs!: Refs<{
    list: DeviceGroupElements;
    create: DeviceGroupElementCreateDialog;
    edit: DeviceGroupUpdateDialog;
    delete: DeviceGroupDeleteDialog;
  }>;

  get deviceGroup(): IDeviceGroup | null {
    return this.record;
  }

  get icon(): string {
    return NavigationIcon.DeviceGroup;
  }

  get title(): string {
    return this.deviceGroup
      ? `Manage device group "${this.deviceGroup.name}"`
      : "";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDeviceGroup> {
    let format: IDeviceGroupResponseFormat = {
      includeAsset: true
    };
    return getDeviceGroup(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(deviceGroup: IDeviceGroup) {
    var section: INavigationSection = {
      id: "groups",
      title: "Device Group",
      icon: "cubes",
      route: "/admin/groups/" + deviceGroup.token,
      longTitle: "Manage Device Group: " + deviceGroup.token
    };
    this.$store.commit("currentSection", section);
  }

  // Show dialog on update requested.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Show dialog on delete requested.
  onDelete() {
    if (this.token) {
      this.$refs.delete.open(this.token);
    }
  }

  // Called after device group is deleted.
  onDeviceGroupDeleted() {
    routeTo(this, "/groups");
  }

  /** Called when 'add element' button is clicked */
  onAddGroupElement() {
    this.$refs.create.open();
  }

  /** Called when an element is added */
  onElementAdded() {
    this.$refs.list.refresh();
  }
}
</script>
