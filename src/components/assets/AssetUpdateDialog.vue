<template>
  <asset-dialog
    ref="dialog"
    title="Edit Asset"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { getAsset, updateAsset } from "sitewhere-ide-common";
import { EditDialogComponent, DialogComponent } from "sitewhere-ide-components";

import AssetDialog from "./AssetDialog.vue";

import { AxiosPromise } from "axios";
import {
  IAsset,
  IAssetCreateRequest,
  IAssetResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    AssetDialog
  }
})
export default class AssetUpdateDialog extends EditDialogComponent<
  IAsset,
  IAssetCreateRequest
> {
  @Ref() readonly dialog!: AssetDialog;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAsset> {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAsset> {
    const format: IAssetResponseFormat = { includeAssetType: true };
    return getAsset(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IAsset,
    updated: IAssetCreateRequest
  ): AxiosPromise<IAsset> {
    return updateAsset(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IAssetCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IAsset): void {
    this.$emit("assetUpdated", payload);
  }
}
</script>
