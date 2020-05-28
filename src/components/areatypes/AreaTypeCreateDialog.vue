<template>
  <area-type-dialog
    ref="dialog"
    title="Create Area Type"
    width="600"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { createAreaType } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import AreaTypeDialog from "./AreaTypeDialog.vue";

import { AxiosPromise } from "axios";
import { IAreaType, IAreaTypeCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    AreaTypeDialog
  }
})
export default class AreaTypeCreateDialog extends CreateDialogComponent<
  IAreaType,
  IAreaTypeCreateRequest
> {
  @Ref() readonly dialog!: AreaTypeDialog;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAreaType> {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IAreaTypeCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IAreaTypeCreateRequest): AxiosPromise<IAreaType> {
    return createAreaType(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IAreaType): void {
    this.$emit("areaTypeAdded", payload);
  }
}
</script>
