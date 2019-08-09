<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Device Group Element"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component, Prop, DeleteDialogComponent } from "sitewhere-ide-common";

import { AxiosPromise } from "axios";
import {
  IDeviceGroupElementResponseFormat,
  IDeviceGroupElementSearchCriteria,
  IDeviceGroupElementSearchResults
} from "sitewhere-rest-api";
import {
  listDeviceGroupElements,
  deleteDeviceGroupElement
} from "../../rest/sitewhere-device-groups-api";

@Component({})
export default class DeviceGroupElementDeleteDialog extends DeleteDialogComponent<
  IDeviceGroupElementSearchResults
> {
  @Prop() token!: string;

  message: string | null = null;
  deleteId!: string;

  /** Load payload */
  prepareLoad(
    identifier: string
  ): AxiosPromise<IDeviceGroupElementSearchResults> {
    this.deleteId = identifier;
    let criteria: IDeviceGroupElementSearchCriteria = {
      deviceGroupToken: this.token
    };
    let format: IDeviceGroupElementResponseFormat = {};
    return listDeviceGroupElements(this.$store, this.token, criteria, format);
  }

  /** Called after record is loaded */
  afterLoad(item: IDeviceGroupElementSearchResults): void {
    this.message = `Are you sure you want to delete this element from the group?`;
  }

  /** Load payload */
  prepareDelete(
    item: IDeviceGroupElementSearchResults
  ): AxiosPromise<IDeviceGroupElementSearchResults> {
    deleteDeviceGroupElement(this.$store, this.token, this.deleteId);
    let criteria: IDeviceGroupElementSearchCriteria = {
      deviceGroupToken: this.token
    };
    let format: IDeviceGroupElementResponseFormat = {};
    return listDeviceGroupElements(this.$store, this.token, criteria, format);
  }

  // Called after create button is clicked.
  onDelete(e: any) {
    this.delete();
  }

  // Called after cancel button is clicked.
  onCancel(e: any) {
    this.cancel();
  }
}
</script>
