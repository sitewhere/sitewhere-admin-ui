<template>
  <asset-type-dialog
    ref="dialog"
    title="Edit Asset Type"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { getAssetType, updateAssetType } from "sitewhere-ide-common";
import { EditDialogComponent, DialogComponent } from "sitewhere-ide-components";

import AssetTypeDialog from "./AssetTypeDialog.vue";

import { AxiosPromise } from "axios";
import {
  IAssetType,
  IAssetTypeCreateRequest,
  IAssetTypeResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    AssetTypeDialog
  }
})
export default class AssetTypeUpdateDialog extends EditDialogComponent<
  IAssetType,
  IAssetTypeCreateRequest
> {
  @Ref() readonly dialog!: AssetTypeDialog;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAssetType> {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAssetType> {
    let format: IAssetTypeResponseFormat = {};
    return getAssetType(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IAssetType,
    updated: IAssetTypeCreateRequest
  ): AxiosPromise<IAssetType> {
    return updateAssetType(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IAssetTypeCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IAssetType): void {
    this.$emit("assetTypeUpdated", payload);
  }
}
</script>
