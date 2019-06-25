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
import {
  Component,
  EditDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import AssetTypeDialog from "./AssetTypeDialog.vue";

import { AxiosPromise } from "axios";
import {
  IAssetType,
  IAssetTypeCreateRequest,
  IAssetTypeResponseFormat
} from "sitewhere-rest-api";
import {
  getAssetType,
  updateAssetType
} from "../../rest/sitewhere-asset-types-api";

@Component({
  components: {
    AssetTypeDialog
  }
})
export default class AssetTypeUpdateDialog extends EditDialogComponent<
  IAssetType,
  IAssetTypeCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IAssetType>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAssetType> {
    return this.$refs.dialog;
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
