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
        :deviceType="deviceType"
        @deviceTypeDeleted="onDeleted"
        @deviceTypeUpdated="onUpdated"
      />
    </template>
    <v-tabs v-model="active">
      <v-tab key="commands" href="#commands">Commands</v-tab>
      <v-tab key="statuses" href="#statuses">Device Statuses</v-tab>
      <v-tab key="code" href="#code">Code Generation</v-tab>
      <v-tab
        v-if="containerPolicy === 'Composite'"
        key="composition"
        href="#composition"
      >Composition</v-tab>
    </v-tabs>
    <v-tabs-items>
      <v-tab-item key="commands" id="commands">
        <device-type-commands ref="commands" :deviceType="deviceType"></device-type-commands>
      </v-tab-item>
      <v-tab-item key="statuses" id="statuses">
        <device-type-statuses ref="statuses" :deviceType="deviceType"></device-type-statuses>
      </v-tab-item>
      <v-tab-item key="code" id="code">
        <device-type-codegen :deviceType="deviceType"></device-type-codegen>
      </v-tab-item>
      <v-tab-item v-if="containerPolicy === 'Composite'" key="composition" id="composition">
        <device-type-composition :deviceType="deviceType"></device-type-composition>
      </v-tab-item>
    </v-tabs-items>
    <template slot="actions">
      <navigation-action-button icon="edit" tooltip="Edit Device Type" @action="onEdit"/>
      <navigation-action-button icon="times" tooltip="Delete Device Type" @action="onDelete"/>
    </template>
    <template slot="dialogs">
      <device-type-update-dialog ref="edit" :token="token" @deviceTypeUpdated="onUpdated"></device-type-update-dialog>
      <device-type-delete-dialog ref="delete" :token="token" @deviceTypeDeleted="onDeleted"></device-type-delete-dialog>
      <command-create-dialog
        v-if="active === 'commands'"
        :deviceType="deviceType"
        @commandAdded="onCommandAdded"
      />
      <device-status-create-dialog
        v-if="active === 'statuses'"
        :deviceType="deviceType"
        @statusAdded="onStatusAdded"
      />
    </template>
  </detail-page>
</template>

<script lang="ts">
import { DetailComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

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

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection } from "../../libraries/navigation-model";
import { getDeviceType } from "../../rest/sitewhere-device-types-api";
import {
  IDeviceType,
  IDeviceTypeResponseFormat,
  DeviceContainerPolicy
} from "sitewhere-rest-api";

export class DeviceTypeDetailComponent extends DetailComponent<IDeviceType> {}

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
export default class DeviceTypeDetail extends Mixins(
  DeviceTypeDetailComponent
) {
  active: string | null = null;

  get deviceType(): IDeviceType | null {
    return this.record;
  }

  get icon(): string {
    return NavigationIcon.Device;
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
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<IDeviceType> {
    let format: IDeviceTypeResponseFormat = {
      includeAsset: true
    };
    return getDeviceType(store, token, format);
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

  // Called to open area edit dialog.
  onEdit() {
    (this.$refs["edit"] as any).onOpenDialog();
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
