<template>
  <delete-dialog
    ref="dialog"
    title="Delete Asset"
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
import { getAsset, deleteAsset } from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IAsset, IAssetResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class AssetDeleteDialog extends DeleteDialogComponent<IAsset> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAsset> {
    const format: IAssetResponseFormat = {};
    return getAsset(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(item: IAsset): void {
    this.message = `Are you sure you want to delete '${item.name}'?`;
  }

  /** Load payload */
  prepareDelete(item: IAsset): AxiosPromise<IAsset> {
    return deleteAsset(this.$store, item.token);
  }

  /** Called after create button is clicked */
  onDelete() {
    this.delete();
    this.$emit('assetDeleted')
  }

  /** Called after cancel button is clicked */
  onCancel() {
    this.cancel();
  }
}
</script>
