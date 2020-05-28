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
import { Component, Prop, Ref } from "vue-property-decorator";
import { createCustomer } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import CustomerDialog from "./CustomerDialog.vue";

import { AxiosPromise } from "axios";
import { ICustomer, ICustomerCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    CustomerDialog
  }
})
export default class CustomerCreateDialog extends CreateDialogComponent<
  ICustomer,
  ICustomerCreateRequest
> {
  @Prop() readonly parentCustomer!: ICustomer;
  @Ref() readonly dialog!: CustomerDialog;

  /** Get wrapped dialog */
  getDialog(): CustomerDialog {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: ICustomerCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: ICustomerCreateRequest): AxiosPromise<ICustomer> {
    if (this.parentCustomer) {
      payload.parentToken = this.parentCustomer.token;
    }
    return createCustomer(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ICustomer): void {
    this.$emit("customerAdded", payload);
  }
}
</script>
