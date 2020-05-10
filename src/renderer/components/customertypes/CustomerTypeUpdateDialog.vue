<template>
  <customer-type-dialog
    ref="dialog"
    title="Edit Customer Type"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { getCustomerType, updateCustomerType } from "sitewhere-ide-common";
import { EditDialogComponent } from "sitewhere-ide-components";

import CustomerTypeDialog from "./CustomerTypeDialog.vue";

import { AxiosPromise } from "axios";
import {
  ICustomerType,
  ICustomerTypeCreateRequest,
  ICustomerTypeResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    CustomerTypeDialog
  }
})
export default class CustomerTypeUpdateDialog extends EditDialogComponent<
  ICustomerType,
  ICustomerTypeCreateRequest
> {
  @Ref() readonly dialog!: CustomerTypeDialog;

  /** Get wrapped dialog */
  getDialog(): CustomerTypeDialog {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ICustomerType> {
    let format: ICustomerTypeResponseFormat = {};
    return getCustomerType(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: ICustomerType,
    updated: ICustomerTypeCreateRequest
  ): AxiosPromise<ICustomerType> {
    return updateCustomerType(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: ICustomerTypeCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ICustomerType): void {
    this.$emit("customerTypeUpdated", payload);
  }
}
</script>
