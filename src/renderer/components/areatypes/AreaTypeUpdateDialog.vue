<template>
  <area-type-dialog
    ref="dialog"
    title="Edit Area Type"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { getAreaType, updateAreaType } from "sitewhere-ide-common";
import { EditDialogComponent, DialogComponent } from "sitewhere-ide-components";

import AreaTypeDialog from "./AreaTypeDialog.vue";

import { AxiosPromise } from "axios";
import {
  IAreaType,
  IAreaTypeCreateRequest,
  IAreaTypeResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    AreaTypeDialog
  }
})
export default class AreaTypeUpdateDialog extends EditDialogComponent<
  IAreaType,
  IAreaTypeCreateRequest
> {
  @Ref() readonly dialog!: AreaTypeDialog;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAreaType> {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IAreaType> {
    let format: IAreaTypeResponseFormat = {};
    return getAreaType(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IAreaType,
    updated: IAreaTypeCreateRequest
  ): AxiosPromise<IAreaType> {
    return updateAreaType(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IAreaTypeCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IAreaType): void {
    this.$emit("areaTypeUpdated", payload);
  }
}
</script>
