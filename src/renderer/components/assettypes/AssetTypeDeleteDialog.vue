<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Asset Type"
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

import { IAssetType, IAssetTypeResponseFormat } from "sitewhere-rest-api";
import {
  getAssetType,
  deleteAssetType
} from "../../rest/sitewhere-asset-types-api";

@Component({})
export default class AssetTypeDeleteDialog extends DeleteDialogComponent<
  IAssetType
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAssetType> {
    let format: IAssetTypeResponseFormat = {};
    return getAssetType(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(item: IAssetType): void {
    this.message = `Are you sure you want to delete '${item.name}'?`;
  }

  /** Load payload */
  prepareDelete(item: IAssetType): AxiosPromise<IAssetType> {
    return deleteAssetType(this.$store, item.token);
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
