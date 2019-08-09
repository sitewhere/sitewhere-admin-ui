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
import {
  Component,
  EditDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import CustomerTypeDialog from "./CustomerTypeDialog.vue";

import { AxiosPromise } from "axios";
import {
  ICustomerType,
  ICustomerTypeCreateRequest,
  ICustomerTypeResponseFormat
} from "sitewhere-rest-api";
import {
  getCustomerType,
  updateCustomerType
} from "../../rest/sitewhere-customer-types-api";

@Component({
  components: {
    CustomerTypeDialog
  }
})
export default class CustomerTypeUpdateDialog extends EditDialogComponent<
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
