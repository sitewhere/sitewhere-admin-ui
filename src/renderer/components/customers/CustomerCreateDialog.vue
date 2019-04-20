<template>
  <customer-dialog
    ref="dialog"
    title="Create Customer"
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

import CustomerDialog from "./CustomerDialog.vue";

import { AxiosPromise } from "axios";
import { ICustomer, ICustomerCreateRequest } from "sitewhere-rest-api";
import { createCustomer } from "../../rest/sitewhere-customers-api";

@Component({
  components: {
    CustomerDialog
  }
})
export default class CustomerCreateDialog extends CreateDialogComponent<
  ICustomer,
  ICustomerCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<ICustomer>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<ICustomer> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: ICustomerCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: ICustomerCreateRequest): AxiosPromise<ICustomer> {
    return createCustomer(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ICustomer): void {
    this.$emit("customerAdded", payload);
  }
}
</script>

<style scoped>
</style>
