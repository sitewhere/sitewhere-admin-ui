<template>
  <delete-dialog
    ref="dialog"
    title="Delete Zone"
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
import { getZone, deleteZone } from "sitewhere-ide-common";

import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IZone } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class ZoneDeleteDialog extends DeleteDialogComponent<IZone> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IZone> {
    return getZone(this.$store, identifier);
  }

  /** Called after record is loaded */
  afterLoad(entity: IZone): void {
    this.message = `Are you sure you want to delete '${entity.name}'?`;
  }

  /** Load payload */
  prepareDelete(entity: IZone): AxiosPromise<IZone> {
    return deleteZone(this.$store, entity.token);
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
