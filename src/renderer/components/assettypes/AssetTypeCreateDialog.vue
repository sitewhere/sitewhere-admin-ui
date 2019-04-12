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
import {
  CreateDialogComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component } from "vue-property-decorator";
import { Refs } from "../../libraries/navigation-model";

import AssetTypeDialog from "./AssetTypeDialog.vue";

import { AxiosPromise } from "axios";
import { IAssetType, IAssetTypeCreateRequest } from "sitewhere-rest-api";
import { createAssetType } from "../../rest/sitewhere-asset-types-api";

@Component({
  components: {
    AssetTypeDialog
  }
})
export default class AssetTypeCreateDialog extends CreateDialogComponent<
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

<style scoped>
</style>
