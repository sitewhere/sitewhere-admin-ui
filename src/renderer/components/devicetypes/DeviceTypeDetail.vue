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
      <v-tab key="commands" href="#commands">Commands</v-tab>
      <v-tab key="statuses" href="#statuses">Device Statuses</v-tab>
      <v-tab key="code" href="#code">Code Generation</v-tab>
      <v-tab
        v-if="containerPolicy === 'Composite'"
        key="composition"
        href="#composition"
      >Composition</v-tab>
    </template>
    <template slot="tab-items">
      <device-type-commands
        tabkey="commands"
        id="commands"
        ref="commands"
        :deviceType="deviceType"
      />
      <device-type-statuses
        tabkey="statuses"
        id="statuses"
        ref="statuses"
        :deviceType="deviceType"
      />
      <device-type-codegen tabkey="code" id="code" :deviceType="deviceType"/>
      <v-tab-item v-if="containerPolicy === 'Composite'" key="composition" id="composition">
        <device-type-composition :deviceType="deviceType"></device-type-composition>
      </v-tab-item>
    </template>
    <template slot="actions">
      <navigation-action-button icon="bolt" tooltip="Create Command" @action="onCommandCreate"/>
      <navigation-action-button icon="edit" tooltip="Edit Device Type" @action="onEdit"/>
      <navigation-action-button icon="times" tooltip="Delete Device Type" @action="onDelete"/>
    </template>
    <template slot="dialogs">
      <device-type-update-dialog ref="edit" :token="token" @deviceTypeUpdated="onUpdated"/>
      <device-type-delete-dialog ref="delete" :token="token" @deviceTypeDeleted="onDeleted"/>
      <command-create-dialog ref="command" :deviceType="deviceType" @commandAdded="onCommandAdded"/>
      <device-status-create-dialog :deviceType="deviceType" @statusAdded="onStatusAdded"/>
    </template>
  </detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  DialogComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import DetailPage from "../common/DetailPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import DeviceTypeDetailHeader from "./DeviceTypeDetailHeader.vue";
import DeviceTypeCommands from "./DeviceTypeCommands.vue";
import DeviceTypeStatuses from "./DeviceTypeStatuses.vue";
import DeviceTypeCodegen from "./DeviceTypeCodegen.vue";
import DeviceTypeComposition from "./DeviceTypeComposition.vue";
import DeviceTypeDeleteDialog from "./DeviceTypeDeleteDialog.vue";
import DeviceTypeUpdateDialog from "./DeviceTypeUpdateDialog.vue";
import CommandCreateDialog from "../commands/CommandCreateDialog.vue";
import DeviceStatusCreateDialog from "../statuses/DeviceStatusCreateDialog.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getDeviceType } from "../../rest/sitewhere-device-types-api";
import {
  IDeviceType,
  IDeviceTypeResponseFormat,
  DeviceContainerPolicy
} from "sitewhere-rest-api";

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    DeviceTypeDetailHeader,
    DeviceTypeCommands,
    DeviceTypeStatuses,
    DeviceTypeCodegen,
    DeviceTypeComposition,
    DeviceTypeDeleteDialog,
    DeviceTypeUpdateDialog,
    CommandCreateDialog,
    DeviceStatusCreateDialog
  }
})
export default class DeviceTypeDetail extends DetailComponent<IDeviceType> {
  // References.
  $refs!: Refs<{
    command: CommandCreateDialog;
    edit: DeviceTypeUpdateDialog;
    delete: DialogComponent<IDeviceType>;
  }>;

  get deviceType(): IDeviceType | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  get title(): string {
    return this.deviceType
      ? `Manage device type ${this.deviceType.token}`
      : "Manage device type";
  }

  get containerPolicy(): DeviceContainerPolicy {
    return this.deviceType
      ? this.deviceType.containerPolicy
      : DeviceContainerPolicy.Standalone;
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDeviceType> {
    let format: IDeviceTypeResponseFormat = {
      includeAsset: true
    };
    return getDeviceType(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(deviceType: IDeviceType) {
    var section: INavigationSection = {
      id: "devicetypes",
      title: "Device Types",
      icon: "map",
      route: "/admin/devicetypes/" + deviceType.token,
      longTitle: "Manage Device Type: " + deviceType.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called on command create.
  onCommandCreate() {
    this.$refs.command.open();
  }

  // Called to open area edit dialog.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called after update.
  onUpdated() {
    this.refresh();
  }

  onDelete() {
    (this.$refs["delete"] as any).showDeleteDialog();
  }

  // Called after delete.
  onDeleted() {
    routeTo(this, "/devicetypes");
  }

  // Called after a command is added.
  onCommandAdded() {
    (this.$refs["commands"] as any).refresh();
  }

  // Called after a status is added.
  onStatusAdded() {
    (this.$refs["statuses"] as any).refresh();
  }
}
</script>

<style scoped>
</style>
