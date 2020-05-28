<template>
  <delete-dialog
    ref="dialog"
    title="Delete Area Type"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </delete-dialog>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { getAreaType, deleteAreaType } from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IAreaType, IAreaTypeResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class AreaTypeDeleteDialog extends DeleteDialogComponent<
  IAreaType
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAreaType> {
    const format: IAreaTypeResponseFormat = {};
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

  /** Called after delete button is clicked */
  onDelete() {
    this.delete();
  }

  /** Called after cancel button is clicked */
  onCancel() {
    this.cancel();
  }
}
</script>
