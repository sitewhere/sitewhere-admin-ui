<template>
  <invocation-by-assignment-criteria-dialog
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
import { createInvocationsByAssignmentCriteria } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import InvocationByAssignmentCriteriaDialog from "./InvocationByAssignmentCriteriaDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignmentSearchCriteria,
  IInvocationByAssignmentCriteriaRequest,
  IBatchOperation
} from "sitewhere-rest-api";

@Component({
  components: {
    InvocationByAssignmentCriteriaDialog
  }
})
export default class InvocationByAssignmentCriteriaCreateDialog extends CreateDialogComponent<
  IBatchOperation,
  IInvocationByAssignmentCriteriaRequest
> {
  @Prop() readonly filter!: IDeviceAssignmentSearchCriteria;
  @Ref() readonly dialog!: DialogComponent<IBatchOperation>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IBatchOperation> {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IInvocationByAssignmentCriteriaRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IInvocationByAssignmentCriteriaRequest
  ): AxiosPromise<IBatchOperation> {
    return createInvocationsByAssignmentCriteria(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IBatchOperation): void {}
}
</script>
