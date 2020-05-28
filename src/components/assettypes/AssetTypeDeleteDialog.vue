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
import { Component } from "vue-property-decorator";
import { getAssetType, deleteAssetType } from "sitewhere-ide-common";
import { DeleteDialogComponent } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";

import { IAssetType, IAssetTypeResponseFormat } from "sitewhere-rest-api";

@Component({})
export default class AssetTypeDeleteDialog extends DeleteDialogComponent<
  IAssetType
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAssetType> {
    const format: IAssetTypeResponseFormat = {};
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
