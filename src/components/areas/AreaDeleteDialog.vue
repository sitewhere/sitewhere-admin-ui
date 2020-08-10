<template>
  <delete-dialog
    ref="dialog"
    title="Delete Area"
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
import { getArea, deleteArea } from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IArea, IAreaResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class AreaDeleteDialog extends DeleteDialogComponent<IArea> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IArea> {
    const format: IAreaResponseFormat = {};
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
