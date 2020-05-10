<template>
  <invocation-by-device-criteria-dialog
    ref="dialog"
    title="Invoke Batch Command"
    width="600"
    :filter="filter"
    createLabel="Invoke"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { createInvocationsByDeviceCriteria } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import InvocationByDeviceCriteriaDialog from "./InvocationByDeviceCriteriaDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceSearchCriteria,
  IInvocationByDeviceCriteriaRequest,
  IBatchOperation
} from "sitewhere-rest-api";

@Component({
  components: {
    InvocationByDeviceCriteriaDialog
  }
})
export default class InvocationByDeviceCriteriaCreateDialog extends CreateDialogComponent<
  IBatchOperation,
  IInvocationByDeviceCriteriaRequest
> {
  @Prop() readonly filter!: IDeviceSearchCriteria;
  @Ref() readonly dialog!: DialogComponent<IBatchOperation>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IBatchOperation> {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IInvocationByDeviceCriteriaRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IInvocationByDeviceCriteriaRequest
  ): AxiosPromise<IBatchOperation> {
    return createInvocationsByDeviceCriteria(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IBatchOperation): void {}
}
</script>
