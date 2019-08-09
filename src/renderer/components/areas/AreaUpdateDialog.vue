<template>
  <area-dialog
    ref="dialog"
    title="Edit Area"
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

import AreaDialog from "./AreaDialog.vue";

import { AxiosPromise } from "axios";
import {
  IArea,
  IAreaCreateRequest,
  IAreaResponseFormat
} from "sitewhere-rest-api";
import { getArea, updateArea } from "../../rest/sitewhere-areas-api";

@Component({
  components: {
    AreaDialog
  }
})
export default class AreaUpdateDialog extends EditDialogComponent<
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

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IArea> {
    let format: IAreaResponseFormat = { includeAreaType: true };
    return getArea(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IArea,
    updated: IAreaCreateRequest
  ): AxiosPromise<IArea> {
    return updateArea(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IAreaCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IArea): void {
    this.$emit("areaUpdated", payload);
  }
}
</script>
