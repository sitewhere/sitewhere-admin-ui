<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Area Type"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component, DeleteDialogComponent } from "sitewhere-ide-common";

import { AxiosPromise } from "axios";
import { IAreaType, IAreaTypeResponseFormat } from "sitewhere-rest-api";
import {
  getAreaType,
  deleteAreaType
} from "../../rest/sitewhere-area-types-api";

@Component({})
export default class AreaTypeDeleteDialog extends DeleteDialogComponent<
  IAreaType
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAreaType> {
    let format: IAreaTypeResponseFormat = {};
    return getAreaType(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(item: IAreaType): void {
    this.message = `Are you sure you want to delete '${item.name}'?`;
  }

  /** Load payload */
  prepareDelete(area: IAreaType): AxiosPromise<IAreaType> {
    return deleteAreaType(this.$store, area.token);
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
