<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Area"
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
import { IArea, IAreaResponseFormat } from "sitewhere-rest-api";
import { getArea, deleteArea } from "../../rest/sitewhere-areas-api";

@Component({})
export default class AreaDeleteDialog extends DeleteDialogComponent<IArea> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IArea> {
    let format: IAreaResponseFormat = {};
    return getArea(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(area: IArea): void {
    this.message = `Are you sure you want to delete '${area.name}'?`;
  }

  /** Load payload */
  prepareDelete(area: IArea): AxiosPromise<IArea> {
    return deleteArea(this.$store, area.token);
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
