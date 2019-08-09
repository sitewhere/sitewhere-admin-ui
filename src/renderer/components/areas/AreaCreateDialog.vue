<template>
  <area-dialog
    ref="dialog"
    title="Create Area"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  Prop,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import AreaDialog from "./AreaDialog.vue";

import { AxiosPromise } from "axios";
import { IArea, IAreaCreateRequest } from "sitewhere-rest-api";
import { createArea } from "../../rest/sitewhere-areas-api";

@Component({
  components: {
    AreaDialog
  }
})
export default class AreaCreateDialog extends CreateDialogComponent<
  IArea,
  IAreaCreateRequest
> {
  @Prop() readonly parentArea!: IArea;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IArea>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IArea> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IAreaCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IAreaCreateRequest): AxiosPromise<IArea> {
    if (this.parentArea) {
      payload.parentToken = this.parentArea.token;
    }
    return createArea(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IArea): void {}
}
</script>
