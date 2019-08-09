<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Asset"
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
import { IAsset, IAssetResponseFormat } from "sitewhere-rest-api";
import { getAsset, deleteAsset } from "../../rest/sitewhere-assets-api";

@Component({})
export default class AssetDeleteDialog extends DeleteDialogComponent<IAsset> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAsset> {
    let format: IAssetResponseFormat = {};
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
