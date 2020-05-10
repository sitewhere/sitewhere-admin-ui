<template>
  <customer-dialog
    ref="dialog"
    title="Edit Customer"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { getCustomer, updateCustomer } from "sitewhere-ide-common";
import { EditDialogComponent } from "sitewhere-ide-components";

import CustomerDialog from "./CustomerDialog.vue";

import { AxiosPromise } from "axios";
import {
  ICustomer,
  ICustomerCreateRequest,
  ICustomerResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    CustomerDialog
  }
})
export default class CustomerUpdateDialog extends EditDialogComponent<
  ICustomer,
  ICustomerCreateRequest
> {
  @Ref() readonly dialog!: CustomerDialog;

  /** Get wrapped dialog */
  getDialog(): CustomerDialog {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ICustomer> {
    let format: ICustomerResponseFormat = { includeCustomerType: true };
    return getCustomer(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: ICustomer,
    updated: ICustomerCreateRequest
  ): AxiosPromise<ICustomer> {
    return updateCustomer(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: ICustomerCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ICustomer): void {
    this.$emit("customerUpdated", payload);
  }
}
</script>

<style scoped>
</style>
