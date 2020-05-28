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
import { Component, Ref } from "vue-property-decorator";
import { createCustomerType } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import CustomerTypeDialog from "./CustomerTypeDialog.vue";

import { AxiosPromise } from "axios";
import { ICustomerType, ICustomerTypeCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    CustomerTypeDialog
  }
})
export default class CustomerTypeCreateDialog extends CreateDialogComponent<
  ICustomerType,
  ICustomerTypeCreateRequest
> {
  @Ref() readonly dialog!: CustomerTypeDialog;

  /** Get wrapped dialog */
  getDialog(): CustomerTypeDialog {
    return this.dialog;
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
