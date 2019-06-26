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
import {
  Component,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import AreaTypeDialog from "./AreaTypeDialog.vue";

import { AxiosPromise } from "axios";
import { IAreaType, IAreaTypeCreateRequest } from "sitewhere-rest-api";
import { createAreaType } from "../../rest/sitewhere-area-types-api";

@Component({
  components: {
    AreaTypeDialog
  }
})
export default class AreaTypeCreateDialog extends CreateDialogComponent<
  IAreaType,
  IAreaTypeCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IAreaType>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAreaType> {
    return this.$refs.dialog;
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
