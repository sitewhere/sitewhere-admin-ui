<template>
  <detail-page
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
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import {
  INavigationSection,
  NavigationIcon,
  getDeviceGroup
} from "sitewhere-ide-common";
import { DetailComponent, DetailPage } from "sitewhere-ide-components";

import DeviceGroupDetailHeader from "./DeviceGroupDetailHeader.vue";
import DeviceGroupUpdateDialog from "./DeviceGroupUpdateDialog.vue";
import DeviceGroupDeleteDialog from "./DeviceGroupDeleteDialog.vue";
import DeviceGroupElements from "./DeviceGroupElements.vue";
import DeviceGroupElementCreateDialog from "./DeviceGroupElementCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import { IDeviceGroup, IDeviceGroupResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    DetailPage,
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
  @Ref() readonly list!: DeviceGroupElements;
  @Ref() readonly create!: DeviceGroupElementCreateDialog;
  @Ref() readonly edit!: DeviceGroupUpdateDialog;
  @Ref() readonly delete!: DeviceGroupDeleteDialog;

  active: string | null = null;

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
    const format: IDeviceGroupResponseFormat = {
      includeAsset: true
    };
    return getDeviceGroup(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(deviceGroup: IDeviceGroup) {
    const section: INavigationSection = {
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
      this.edit.open(this.token);
    }
  }

  // Show dialog on delete requested.
  onDelete() {
    if (this.token) {
      this.delete.open(this.token);
    }
  }

  // Called after device group is deleted.
  onDeviceGroupDeleted() {
    routeTo(this, "/groups");
  }

  /** Called when 'add element' button is clicked */
  onAddGroupElement() {
    this.create.open();
  }

  /** Called when an element is added */
  onElementAdded() {
    this.list.refresh();
  }
}
</script>
