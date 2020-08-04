<template>
  <area-dialog
    ref="dialog"
    title="Create Area"
    createLabel="Create"
    cancelLabel="Cancel"
    :parentArea="parentArea"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import {
  CreateDialogComponent,
  DialogComponent,
} from "sitewhere-ide-components";

import AreaDialog from "./AreaDialog.vue";

import { AxiosPromise } from "axios";
import { IArea, IAreaCreateRequest } from "sitewhere-rest-api";
import { createArea } from "sitewhere-ide-common";

@Component({
  components: {
    AreaDialog,
  },
})
export default class AreaCreateDialog extends CreateDialogComponent<
  IArea,
  IAreaCreateRequest
> {
  @Prop() readonly parentArea!: IArea;
  @Ref() readonly dialog!: DialogComponent<IArea>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IArea> {
    return this.dialog;
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
  afterSave(payload: IArea): void {
    console.log(payload);
  }
}
</script>
