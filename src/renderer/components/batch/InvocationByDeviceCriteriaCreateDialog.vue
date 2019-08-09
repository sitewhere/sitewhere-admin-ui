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
import {
  Component,
  Prop,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import InvocationByDeviceCriteriaDialog from "./InvocationByDeviceCriteriaDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceSearchCriteria,
  IInvocationByDeviceCriteriaRequest,
  IBatchOperation
} from "sitewhere-rest-api";
import { createInvocationsByDeviceCriteria } from "../../rest/sitewhere-batch-operations-api";

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

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IBatchOperation>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IBatchOperation> {
    return this.$refs.dialog;
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
