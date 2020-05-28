<template>
  <asset-type-dialog
    ref="dialog"
    title="Create Asset Type"
    resetOnOpen="true"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { createAssetType } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import AssetTypeDialog from "./AssetTypeDialog.vue";

import { AxiosPromise } from "axios";
import { IAssetType, IAssetTypeCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    AssetTypeDialog
  }
})
export default class AssetTypeCreateDialog extends CreateDialogComponent<
  IAssetType,
  IAssetTypeCreateRequest
> {
  @Ref() readonly dialog!: AssetTypeDialog;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAssetType> {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IAssetTypeCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IAssetTypeCreateRequest): AxiosPromise<IAssetType> {
    return createAssetType(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IAssetType): void {
    this.$emit("assetTypeAdded", payload);
  }
}
</script>
