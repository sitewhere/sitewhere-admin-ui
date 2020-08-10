<template>
  <delete-dialog
    ref="dialog"
    title="Delete Device Group Element"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </delete-dialog>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import {
  listDeviceGroupElements,
  deleteDeviceGroupElement
} from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import {
  IDeviceGroupElementResponseFormat,
  IDeviceGroupElementSearchCriteria,
  IDeviceGroupElementSearchResults
} from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
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
    const criteria: IDeviceGroupElementSearchCriteria = {
      deviceGroupToken: this.token
    };
    const format: IDeviceGroupElementResponseFormat = {};
    return listDeviceGroupElements(this.$store, this.token, criteria, format);
  }

  /** Called after record is loaded */
  afterLoad(): void {
    this.message = `Are you sure you want to delete this element from the group?`;
  }

  /** Load payload */
  prepareDelete(): AxiosPromise<IDeviceGroupElementSearchResults> {
    deleteDeviceGroupElement(this.$store, this.token, this.deleteId);
    const criteria: IDeviceGroupElementSearchCriteria = {
      deviceGroupToken: this.token
    };
    const format: IDeviceGroupElementResponseFormat = {};
    return listDeviceGroupElements(this.$store, this.token, criteria, format);
  }

  /** Called after create button is clicked */
  onDelete() {
    this.delete();
  }

  /** Called after cancel button is clicked */
  onCancel() {
    this.cancel();
  }
}
</script>
