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
  CreateDialogComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component } from "vue-property-decorator";
import { Refs } from "../../libraries/navigation-model";

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
    return createArea(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IArea): void {
    this.$emit("areaAdded", payload);
  }
}
</script>

<style scoped>
</style>
