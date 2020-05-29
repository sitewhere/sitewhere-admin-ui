<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading device type ..."
    :loaded="loaded"
    :record="deviceType"
  >
    <template slot="header">
      <device-type-detail-header
        :record="deviceType"
        @deviceTypeDeleted="onDeleted"
        @deviceTypeUpdated="onUpdated"
      />
    </template>
    <template slot="tabs">
      <v-tab key="commands">Commands</v-tab>
      <v-tab key="statuses">Device Statuses</v-tab>
      <!--
      <v-tab key="code">Code Generation</v-tab>
      -->
      <v-tab v-if="containerPolicy === 'Composite'" key="composition">Composition</v-tab>
    </template>
    <template slot="tab-items">
      <device-type-commands tabkey="commands" ref="commands" :deviceTypeToken="token" />
      <device-type-statuses tabkey="statuses" ref="statuses" :deviceTypeToken="token" />
      <!--
      <device-type-codegen tabkey="code" id="code" :deviceType="deviceType"/>
      -->
      <device-type-composition tabkey="composition" :deviceType="deviceType" />
    </template>
    <template slot="actions">
      <device-command-button tooltip="Create Command" @action="onCommandCreate" />
      <device-status-button tooltip="Create Status" @action="onStatusCreate" />
      <edit-button tooltip="Edit Device Type" @action="onEdit" />
      <delete-button tooltip="Delete Device Type" @action="onDelete" />
    </template>
    <template slot="dialogs">
      <device-type-update-dialog ref="edit" :token="token" @deviceTypeUpdated="onUpdated" />
      <device-type-delete-dialog ref="delete" :token="token" @deviceTypeDeleted="onDeleted" />
      <command-create-dialog ref="command" :deviceTypeToken="token" @commandAdded="onCommandAdded" />
      <device-status-create-dialog
        ref="status"
        :deviceTypeToken="token"
        @statusAdded="onStatusAdded"
      />
    </template>
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, getDeviceType } from "sitewhere-ide-common";
import { DetailComponent, DetailPage } from "sitewhere-ide-components";

import DeviceTypeDetailHeader from "./DeviceTypeDetailHeader.vue";
import DeviceTypeCommands from "./DeviceTypeCommands.vue";
import DeviceTypeStatuses from "./DeviceTypeStatuses.vue";
import DeviceTypeComposition from "./DeviceTypeComposition.vue";
import DeviceTypeDeleteDialog from "./DeviceTypeDeleteDialog.vue";
import DeviceTypeUpdateDialog from "./DeviceTypeUpdateDialog.vue";
import CommandCreateDialog from "../commands/CommandCreateDialog.vue";
import DeviceStatusCreateDialog from "../statuses/DeviceStatusCreateDialog.vue";
import DeviceCommandButton from "../common/navbuttons/DeviceCommandButton.vue";
import DeviceStatusButton from "../common/navbuttons/DeviceStatusButton.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import {
  IDeviceType,
  IDeviceTypeResponseFormat,
  DeviceContainerPolicy
} from "sitewhere-rest-api";
import { DeviceTypesSection } from "../../libraries/constants";

@Component({
  components: {
    DetailPage,
    DeviceTypeDetailHeader,
    DeviceTypeCommands,
    DeviceTypeStatuses,
    DeviceTypeComposition,
    DeviceTypeDeleteDialog,
    DeviceTypeUpdateDialog,
    CommandCreateDialog,
    DeviceStatusCreateDialog,
    DeviceCommandButton,
    DeviceStatusButton,
    EditButton,
    DeleteButton
  }
})
export default class DeviceTypeDetail extends DetailComponent<IDeviceType> {
  @Ref() readonly commands!: DeviceTypeCommands;
  @Ref() readonly statuses!: DeviceTypeStatuses;
  @Ref() readonly command!: CommandCreateDialog;
  @Ref() readonly status!: DeviceStatusCreateDialog;
  @Ref() readonly edit!: DeviceTypeUpdateDialog;
  @Ref() readonly delete!: DeviceTypeDeleteDialog;

  active: string | null = null;

  get deviceType(): IDeviceType | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  get title(): string {
    return this.deviceType
      ? `Manage device type "${this.deviceType.name}"`
      : "Manage device type";
  }

  get containerPolicy(): DeviceContainerPolicy {
    return this.deviceType
      ? this.deviceType.containerPolicy
      : DeviceContainerPolicy.Standalone;
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDeviceType> {
    const format: IDeviceTypeResponseFormat = {
      includeAsset: true
    };
    return getDeviceType(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded() {
    this.$store.commit("currentSection", DeviceTypesSection);
  }

  /** Called on command create */
  onCommandCreate() {
    this.command.open();
  }

  /** Called on status create */
  onStatusCreate() {
    this.status.open();
  }

  /** Called to open area edit dialog */
  onEdit() {
    if (this.token) {
      this.edit.open(this.token);
    }
  }

  /** Called after update */
  onUpdated() {
    this.refresh();
  }

  onDelete() {
    if (this.token) {
      this.delete.open(this.token);
    }
  }

  /** Called after delete */
  onDeleted() {
    routeTo(this, "/devicetypes");
  }

  /** Called after a command is added */
  onCommandAdded() {
    this.commands.refresh();
  }

  /** Called after a status is added */
  onStatusAdded() {
    this.statuses.refresh();
  }
}
</script>
