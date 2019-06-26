<template>
  <asset-dialog
    ref="dialog"
    title="Create Asset"
    width="600"
    resetOnOpen="true"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import AssetDialog from "./AssetDialog.vue";

import { AxiosPromise } from "axios";
import { IAsset, IAssetCreateRequest } from "sitewhere-rest-api";
import { createAsset } from "../../rest/sitewhere-assets-api";

@Component({
  components: {
    AssetDialog
  }
})
export default class AssetCreateDialog extends CreateDialogComponent<
  IAsset,
  IAssetCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IAsset>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAsset> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IAssetCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IAssetCreateRequest): AxiosPromise<IAsset> {
    return createAsset(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IAsset): void {
    this.$emit("assetAdded", payload);
  }
}
</script>
