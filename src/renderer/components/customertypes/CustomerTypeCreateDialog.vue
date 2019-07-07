<template>
  <customer-type-dialog
    ref="dialog"
    title="Create Customer Type"
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

import CustomerTypeDialog from "./CustomerTypeDialog.vue";

import { AxiosPromise } from "axios";
import { ICustomerType, ICustomerTypeCreateRequest } from "sitewhere-rest-api";
import { createCustomerType } from "../../rest/sitewhere-customer-types-api";

@Component({
  components: {
    CustomerTypeDialog
  }
})
export default class CustomerTypeCreateDialog extends CreateDialogComponent<
  ICustomerType,
  ICustomerTypeCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<ICustomerType>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<ICustomerType> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: ICustomerTypeCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: ICustomerTypeCreateRequest): AxiosPromise<ICustomerType> {
    return createCustomerType(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ICustomerType): void {
    this.$emit("customerTypeAdded", payload);
  }
}
</script>
